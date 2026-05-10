import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductItem} from '~/components/ProductItem';
import type {CatalogLoaderData} from '~/lib/catalog.server';
import type {CollectionItemFragment} from 'storefrontapi.generated';
import {SugarDownCatalogLegacy} from '~/components/sugar-down/SugarDownCatalogLegacy';

type Props = {
  products: CatalogLoaderData['products'];
};

export function CatalogPage({products}: Props) {
  return (
    <div className="collection sd-catalog">
      <div className="sd-catalog-top">
        <h1>Our Products</h1>
        <p>
          Choose your kit or buy individual products. Every order includes 24×7
          WhatsApp care.
        </p>
      </div>
      <div className="wrap">
        <SugarDownCatalogLegacy />
        <PaginatedResourceSection<CollectionItemFragment>
          connection={products}
          resourcesClassName="products-grid"
        >
          {({node: product, index}) => (
            <ProductItem
              key={product.id}
              product={product}
              loading={index < 8 ? 'eager' : undefined}
            />
          )}
        </PaginatedResourceSection>
      </div>
    </div>
  );
}
