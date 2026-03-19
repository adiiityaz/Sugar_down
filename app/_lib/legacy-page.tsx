import { readFile } from "node:fs/promises";
import path from "node:path";

type LegacyPageParts = {
  title: string;
  styleText: string;
  bodyHtml: string;
  inlineScripts: string[];
  externalScripts: string[];
};

const LINK_REPLACEMENTS: Array<[string, string]> = [
  ["index.html", "/"],
  ["sugardown_website.html", "/"],
  ["products.html", "/products"],
  ["about.html", "/about"],
  ["contact.html", "/contact"],
  ["cart.html", "/cart"],
  ["checkout.html", "/checkout"],
  ["confirmation.html", "/confirmation"],
  ["track.html", "/track"],
  ["shared.js", "/shared.js"],
];

const SOURCE_FILE_MAP: Record<string, string> = {
  "sugardown_website.html": path.join(process.cwd(), "legacy-pages", "home.page"),
  "products.html": path.join(process.cwd(), "legacy-pages", "products.page"),
  "about.html": path.join(process.cwd(), "legacy-pages", "about.page"),
  "contact.html": path.join(process.cwd(), "legacy-pages", "contact.page"),
  "cart.html": path.join(process.cwd(), "legacy-pages", "cart.page"),
  "checkout.html": path.join(process.cwd(), "legacy-pages", "checkout.page"),
  "confirmation.html": path.join(process.cwd(), "legacy-pages", "confirmation.page"),
  "track.html": path.join(process.cwd(), "legacy-pages", "track.page"),
};

const CSS_FILE_MAP: Record<string, string> = {
  "sugardown_website.html": path.join(process.cwd(), "legacy-css", "home.css"),
  "products.html": path.join(process.cwd(), "legacy-css", "products.css"),
  "about.html": path.join(process.cwd(), "legacy-css", "about.css"),
  "contact.html": path.join(process.cwd(), "legacy-css", "contact.css"),
  "cart.html": path.join(process.cwd(), "legacy-css", "cart.css"),
  "checkout.html": path.join(process.cwd(), "legacy-css", "checkout.css"),
  "confirmation.html": path.join(process.cwd(), "legacy-css", "confirmation.css"),
  "track.html": path.join(process.cwd(), "legacy-css", "track.css"),
};

function rewriteLinks(input: string): string {
  return LINK_REPLACEMENTS.reduce(
    (html, [from, to]) => html.replaceAll(from, to),
    input
  );
}

function parseLegacyHtml(source: string, styleText: string): LegacyPageParts {
  const rewritten = rewriteLinks(source);

  const titleMatch = rewritten.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch?.[1]?.trim() || "Sugar Down";

  const bodyMatch = rewritten.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyRaw = bodyMatch?.[1] || rewritten;

  const externalScripts = [...bodyRaw.matchAll(/<script[^>]*src="([^"]+)"[^>]*><\/script>/gi)].map(
    (m) => m[1]
  );
  const inlineScripts = [...bodyRaw.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1]
  );

  const bodyHtml = bodyRaw
    .replace(/<script[^>]*src="[^"]+"[^>]*><\/script>/gi, "")
    .replace(/<script>[\s\S]*?<\/script>/gi, "");

  return { title, styleText, bodyHtml, inlineScripts, externalScripts };
}

export async function loadLegacyPage(fileName: string): Promise<LegacyPageParts> {
  const absolutePath = SOURCE_FILE_MAP[fileName];
  const cssPath = CSS_FILE_MAP[fileName];
  if (!absolutePath) {
    throw new Error(`Unsupported legacy page: ${fileName}`);
  }
  if (!cssPath) {
    throw new Error(`Missing CSS map for legacy page: ${fileName}`);
  }
  const source = await readFile(absolutePath, "utf8");
  const styleText = await readFile(cssPath, "utf8");
  return parseLegacyHtml(source, styleText);
}

export function LegacyPageView({ page }: { page: LegacyPageParts }) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: page.styleText }} />
      <main
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: page.bodyHtml }}
      />
      {page.externalScripts.map((src) => (
        <script key={`legacy-ext-${src}`} src={src} />
      ))}
      {page.inlineScripts.map((script, idx) => (
        <script
          key={`legacy-inline-${idx}`}
          dangerouslySetInnerHTML={{ __html: script }}
        />
      ))}
    </>
  );
}
