import React, { memo } from "react";
import "./ProductCard.scss";

export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isAvailable?: boolean;
  description?: string;
  isPopular?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (id: string) => void;
  onClick?: (id: string) => void;
  showDescription?: boolean;
  showAddToCartButton?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({
    product,
    onAddToCart,
    onClick,
    showDescription = true,
    showAddToCartButton = true,
  }) => {
    if (!product) return null;

    const {
      id,
      name,
      price,
      imageUrl,
      isAvailable,
      description,
      isPopular,
    } = product;

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        if (onClick) {
          onClick(id);
        }
      }
    };

    return (
      <article
        className="product-card"
        onClick={() => onClick && onClick(id)}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`Product card for ${name}`}
      >
        {isPopular && <div className="product-card__badge">Популярное</div>}
        <img
          src={imageUrl}
          alt={name}
          className="product-card__image"
          loading="lazy"
          width={200}
          height={200}
        />
        <div className="product-card__info">
          <h3 className="product-card__name">{name}</h3>
          <p className="product-card__price">{price} ₽</p>
          {showDescription && description && (
            <p className="product-card__description">{description}</p>
          )}
          {!isAvailable && (
            <p className="product-card__unavailable" aria-live="polite">
              Нет в наличии
            </p>
          )}
          {showAddToCartButton && isAvailable && (
            <button
              className="product-card__add-to-cart"
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) {
                  onAddToCart(id);
                }
              }}
              aria-label={`Добавить ${name} в корзину`}
            >
              В корзину
            </button>
          )}
        </div>
      </article>
    );
  }
);

ProductCard.displayName = "ProductCard";

export default ProductCard;
