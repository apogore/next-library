import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

const useProductCard = (productId, fetchProductById) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const loadProduct = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProductById(productId);
      setProduct(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [productId, fetchProductById]);

  useEffect(() => {
    if (productId) {
      loadProduct();
    }
  }, [productId, loadProduct]);

  const handleAddToCart = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    cart[id] = (cart[id] || 0) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    // Optionally, you can add state update or toast notifications here
  };

  const handleCardClick = (id) => {
    router.push(`/shared/product/${id}`);
  };

  return {
    product,
    loading,
    error,
    handleAddToCart,
    handleCardClick,
    reload: loadProduct,
  };
};

export default useProductCard;
