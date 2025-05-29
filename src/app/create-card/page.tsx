"use client";

import React from "react";
import ProductCreateForm from "@/app/shared/product-card/ProductCreateForm";

export default function CreateCardPage() {
  const handleCreate = () => {
    // You can add any post-create logic here, e.g. redirect or reload
    console.log("Product created");
  };

  return (
    <div>
      <ProductCreateForm onCreate={handleCreate} />
    </div>
  );
}
