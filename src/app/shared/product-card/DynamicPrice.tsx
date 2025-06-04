import React from "react";

interface DynamicPriceProps {
  price: number;
  quantity: number;
}

const DynamicPrice: React.FC<DynamicPriceProps> = ({ price, quantity }) => {
  const totalPrice = price * quantity;

  return (
    <div className="dynamic-price">
      <span>{price} ₽</span>
      {quantity > 1 && (
        <>
          <span> × {quantity} = </span>
          <span>{totalPrice} ₽</span>
        </>
      )}
    </div>
  );
};

export default DynamicPrice;
