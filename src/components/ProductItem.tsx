import { memo, useState } from "react";
import { AddProductToWishListProps } from "./AddProductToWishList";
import dynamic from "next/dynamic";
import lodash from "lodash";
// import { AddProductToWishList } from "./AddProductToWishList";

const AddProductToWishList = dynamic<AddProductToWishListProps>(
  () => {
    return import("./AddProductToWishList").then((mod) => mod.AddProductToWishList);
  },
  {
    loading: () => <span>Carregando...</span>,
  }
);

interface ProductItemProps {
  product: { id: number; price: number; priceFormatted: string; title: string };
  onAddToWishList: (id: number) => void;
}

function ProductItemComponent({ product, onAddToWishList }: ProductItemProps) {
  const [isAddingToWishList, setIsAddingToWishList] = useState(false);

  return (
    <div>
      {product.title} - {<strong>{product.priceFormatted}</strong>}
      <button onClick={() => setIsAddingToWishList(true)}>Adicionar aos favoritos</button>
      {isAddingToWishList && (
        <AddProductToWishList
          onAddToWishList={() => onAddToWishList(product.id)}
          onRequestClose={() => setIsAddingToWishList(false)}
        />
      )}
    </div>
  );
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return lodash.isEqual(prevProps.product, nextProps.product);
});

/**
 * memo
 *
 * 1. Pure Functional Components (componentes apenas para abstrair algo visual da aplicação)
 * 2. Renders too often (componentes que renderizam demais)
 * 3. Re-renders with same props
 * 4. Medium to big size
 */

/**
 * useMemo / useCallback
 *
 * 1. Cálculos pesados
 * 2. Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
 */
