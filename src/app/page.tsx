"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Carousel from "@/app/shared/carousel/Carousel";

import { Product } from "@/app/shared/product-card/ProductCard";


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async (pageNum: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/books/list?page=${pageNum}`);
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await res.json();
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prev) => [...prev, ...data]);
      }
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page);
  }, [page]);

  const loadMore = () => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const handleAddToCart = (id: string) => {
    // Удаляем, так как логика теперь в компоненте карточки
  };

  const handleClick = (id: string) => {
    // Удаляем, так как логика теперь в компоненте карточки
  };

  if (loading && products.length === 0) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка загрузки товаров: {error}</div>;

  return (
    <>
      <div className="mb-4">
        <Link href="/create-card" className="text-blue-600 hover:underline">
          Создать новый товар
        </Link>
      </div>
      <Carousel
        products={products}
        loadMore={loadMore}
      />
    </>
  );
}
