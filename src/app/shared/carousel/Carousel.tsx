"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import ProductCard, { Product } from "../product-card/ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import "./Carousel.scss";

interface CarouselProps {
  products: Product[];
  onAddToCart?: (id: string) => void;
  onClick?: (id: string) => void;
  loadMore?: () => void;
  hasMore?: boolean;
}

// Custom hook to detect mobile using matchMedia for better performance
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    // Read --mobile-max CSS custom property and parse to number
    const rootStyles = getComputedStyle(document.documentElement);
    const mobileMaxStr = rootStyles.getPropertyValue("--mobile-max").trim();
    const mobileMax = mobileMaxStr.endsWith("px")
      ? parseInt(mobileMaxStr.slice(0, -2))
      : parseInt(mobileMaxStr);

    const mediaQuery = window.matchMedia(`(max-width: ${mobileMax}px)`);

    const handler = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handler);

    // Set initial value
    setIsMobile(mediaQuery.matches);

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isMobile;
};

const Carousel: React.FC<CarouselProps> = ({
  products,
  onAddToCart,
  onClick,
  loadMore,
  hasMore = true,
}) => {
  const isMobile = useIsMobile();

  const [slidesPerView, setSlidesPerView] = React.useState(1);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Calculate slidesPerView dynamically based on container width and slide width
  React.useEffect(() => {
    const calculateSlidesPerView = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const slideMinWidth = 250; // Minimum slide width in px
      const slidesCount = Math.floor(containerWidth / slideMinWidth);
      setSlidesPerView(slidesCount > 0 ? slidesCount : 1);
    };

    calculateSlidesPerView();
    window.addEventListener("resize", calculateSlidesPerView);
    return () => window.removeEventListener("resize", calculateSlidesPerView);
  }, []);

  // Handler for infinite scroll in Swiper
  const handleReachEnd = () => {
    if (loadMore && hasMore) {
      loadMore();
    }
    // else do nothing to allow smooth loop transition
  };

  if (!products.length) {
    return null;
  }

  // Extracted slides rendering to avoid duplication
  const renderSlides = () =>
    products.map((product) => (
      <SwiperSlide key={product.id}>
        <ProductCard
          product={product}
          onAddToCart={onAddToCart}
          onClick={onClick}
          showAddToCartButton={true}
          showDescription={false}
        />
      </SwiperSlide>
    ));

  // Common Swiper props
  const commonProps = {
    spaceBetween: 16,
    loop: hasMore,
    onReachEnd: handleReachEnd,
  };

  // Swiper props with dynamic slidesPerView and smooth loop enabled
  const swiperProps = {
    modules: isMobile ? [Autoplay] : [Navigation],
    slidesPerView: slidesPerView,
    navigation: !isMobile,
    autoplay: isMobile ? { delay: 4000, disableOnInteraction: false } : undefined,
    loop: true,
    loopAdditionalSlides: slidesPerView,
  };

  return (
    <div className="carousel-wrapper" ref={containerRef}>
      <Swiper
        {...commonProps}
        {...swiperProps}
      >
        {renderSlides()}
      </Swiper>
    </div>
  );
};

export default Carousel;
