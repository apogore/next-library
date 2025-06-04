"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "./ProductCard";
import DynamicPrice from "./DynamicPrice";
import Button from "@/app/ui/button/button";
import "@/app/ui/button/button.scss";
import "./ProductCardWithCart.scss";

interface ProductCardWithCartProps {
  product: Product;
}

const CART_STORAGE_KEY = "cart";

const ProductCardWithCart: React.FC<ProductCardWithCartProps> = ({ product }) => {
  const router = useRouter();
  const { id, price, isAvailable } = product;

  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    // Load quantity from localStorage on mount
    if (typeof window !== "undefined") {
      const cartStr = localStorage.getItem(CART_STORAGE_KEY);
      if (cartStr) {
        const cart = JSON.parse(cartStr) as Record<string, number>;
        if (cart[id]) {
          setQuantity(cart[id]);
        }
      }
    }
  }, [id]);

  const updateCart = useCallback((newQuantity: number) => {
    if (typeof window === "undefined") return;
    const cartStr = localStorage.getItem(CART_STORAGE_KEY);
    let cart: Record<string, number> = {};
    if (cartStr) {
      cart = JSON.parse(cartStr);
    }
    if (newQuantity <= 0) {
      delete cart[id];
      setQuantity(0);
    } else {
      cart[id] = newQuantity;
      setQuantity(newQuantity);
    }
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [id]);

  const handleAddToCart = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!isAvailable) return;
    if (quantity === 0) {
      updateCart(1);
    }
  }, [isAvailable, quantity, updateCart]);

  const handleClickCard = useCallback(() => {
    router.push(`/product/${id}`);
  }, [router, id]);

  return (
    <article
      className="product-card-with-cart"
      onClick={handleClickCard}
      role="button"
      tabIndex={0}
      aria-label={`Карточка товара ${product.name}`}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClickCard();
        }
      }}
    >
      <div className="product-card-with-cart__grid">
        <Image
          src={product.imageUrl}
          alt={product.name}
          className="product-card-with-cart__image"
          loading="lazy"
          width={200}
          height={200}
        />
        <div className="product-card-with-cart__content">
          <DynamicPrice price={price} quantity={quantity > 0 ? quantity : 1} />
          {product.description && (
            <p className="product-card-with-cart__description">{product.description}</p>
          )}
          {!isAvailable && (
            <p className="product-card-with-cart__unavailable" aria-live="polite">
              Нет в наличии
            </p>
          )}
        </div>
        {isAvailable && (
          <>
            {quantity === 0 ? (
              <Button
                className="product-card-with-cart__add-to-cart"
                onClick={handleAddToCart}
                aria-label={`Добавить ${product.name} в корзину`}
                text="В корзину"
                icon={undefined}
                style={{}}
              />
            ) : (
              <div className="product-card-with-cart__checkout-controls">
                <Button
                  className="product-card-with-cart__checkout"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    router.push('/cart');
                  }}
                  aria-label="Оформить заказ"
                  text="Оформить"
                  icon={undefined}
                  style={{}}
                />
                <Button
                  className="product-card-with-cart__cancel"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    updateCart(0);
                  }}
                  aria-label="Отменить оформление"
                  text="Отменить"
                  icon={undefined}
                  style={{}}
                />
              </div>
            )}
          </>
        )}
      </div>
    </article>
  );
};

export default ProductCardWithCart;
