import {useLoaderData} from 'react-router';
import type {Route} from './+types/_index';
import {MockShopNotice} from '~/components/MockShopNotice';
import {SugarDownHome} from '~/components/sugar-down/SugarDownHome';
import {useRevealFadeUps} from '~/components/sugar-down/useRevealFadeUps';

import sugarDownHomeStyles from '~/styles/sugar-down-home.css?url';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Sugar Down — Ayurvedic Diabetes Care'}];
};

export function links() {
  return [{rel: 'stylesheet', href: sugarDownHomeStyles}];
}

export async function loader({context}: Route.LoaderArgs) {
  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  const revealRef = useRevealFadeUps();
  return (
    <div className="home sd-index" ref={revealRef}>
      <SugarDownHome />
      {data.isShopLinked ? null : <MockShopNotice />}
    </div>
  );
}
