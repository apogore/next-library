"use client";

import React from "react";
import { useRouter } from "next/navigation";
import ProductCreateForm from "@/app/shared/product-card/ProductCreateForm";

export default function CreateCardPage() {
  const router = useRouter();

  const handleCreate = () => {
    // After creating a product, navigate back to the main page and refresh
    router.push("/");
    router.refresh();
  };

  return (
    <div>
      <ProductCreateForm onCreate={handleCreate} />
    </div>
  );
}
