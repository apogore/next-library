"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/app/shared/product-card/ProductCard";

import { Product } from "@/app/shared/product-card/ProductCard";


export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/books/list");
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки товаров: {error}</div>;

  return (
    <>
      <div className="mb-4">
        <Link href="/create-card" className="text-blue-600 hover:underline">
          Создать новый товар
        </Link>
      </div>
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products && products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => {}}
            onClick={() => {}}
          />
        ))}
      </section>
    </>
  );
}
