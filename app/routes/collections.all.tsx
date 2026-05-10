import type {Route} from './+types/collections.all';
import {useLoaderData} from 'react-router';
import {CatalogPage} from '~/components/CatalogPage';
import {loadCatalogData} from '~/lib/catalog.server';

import sugarDownCatalogStyles from '~/styles/sugar-down-catalog.css?url';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Products — Sugar Down'}];
};

export function links() {
  return [{rel: 'stylesheet', href: sugarDownCatalogStyles}];
}

export async function loader(args: Route.LoaderArgs) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return {...deferredData, ...criticalData};
}

async function loadCriticalData(args: Route.LoaderArgs) {
  return loadCatalogData(args);
}

function loadDeferredData(_args: Route.LoaderArgs) {
  return {};
}

export default function Collection() {
  const {products} = useLoaderData<typeof loader>();

  return <CatalogPage products={products} />;
}
