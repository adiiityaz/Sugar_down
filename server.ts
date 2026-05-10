import * as serverBuild from 'virtual:react-router/server-build';
import {createRequestHandler, storefrontRedirect} from '@shopify/hydrogen';
import {createHydrogenRouterContext} from '~/lib/context';

/**
 * Customer Account OAuth only allows *.tryhydrogen.dev in local dev (not localhost).
 * Set PUBLIC_DEV_TUNNEL_ORIGIN in .env to that URL from the dev terminal so /account/* redirects.
 */
function isLocalDevHost(hostname: string): boolean {
  return (
    hostname === 'localhost' ||
    hostname === '127.0.0.1' ||
    hostname === '[::1]'
  );
}

/** React Router data requests use a `.data` suffix; still must redirect like document navigations. */
function pathnameLooksLikeAccountRoute(pathname: string): boolean {
  const base = pathname.endsWith('.data')
    ? pathname.slice(0, -'.data'.length)
    : pathname;
  return base === '/account' || base.startsWith('/account/');
}

function redirectLocalhostAccountToTunnel(
  request: Request,
  env: Env,
): Response | null {
  const tunnel = env.PUBLIC_DEV_TUNNEL_ORIGIN?.trim();
  if (!tunnel) return null;

  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return null;
  }

  if (!isLocalDevHost(url.hostname) || !pathnameLooksLikeAccountRoute(url.pathname)) {
    return null;
  }

  try {
    const dest = new URL(url.pathname + url.search + url.hash, tunnel);
    return Response.redirect(dest.toString(), 307);
  } catch {
    return null;
  }
}

/**
 * Export a fetch handler in module format.
 */
export default {
  async fetch(
    request: Request,
    env: Env,
    executionContext: ExecutionContext,
  ): Promise<Response> {
    try {
      const tunnelRedirect = redirectLocalhostAccountToTunnel(request, env);
      if (tunnelRedirect) return tunnelRedirect;

      const hydrogenContext = await createHydrogenRouterContext(
        request,
        env,
        executionContext,
      );

      /**
       * Create a Hydrogen request handler that internally
       * delegates to React Router for routing and rendering.
       */
      const handleRequest = createRequestHandler({
        build: serverBuild,
        mode: process.env.NODE_ENV,
        getLoadContext: () => hydrogenContext,
      });

      const response = await handleRequest(request);

      if (hydrogenContext.session.isPending) {
        response.headers.set(
          'Set-Cookie',
          await hydrogenContext.session.commit(),
        );
      }

      if (response.status === 404) {
        /**
         * Check for redirects only when there's a 404 from the app.
         * If the redirect doesn't exist, then `storefrontRedirect`
         * will pass through the 404 response.
         */
        return storefrontRedirect({
          request,
          response,
          storefront: hydrogenContext.storefront,
        });
      }

      return response;
    } catch (error) {
      console.error(error);
      return new Response('An unexpected error occurred', {status: 500});
    }
  },
};
