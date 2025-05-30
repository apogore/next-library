import React, { useState } from "react";
import Button from "@/app/ui/button/button";

interface ProductCreateFormProps {
  onCreate: () => void;
}

const ProductCreateForm: React.FC<ProductCreateFormProps> = ({ onCreate }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isAvailable, setIsAvailable] = useState(true);
  const [description, setDescription] = useState("");
  const [isPopular, setIsPopular] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!name || price === "" || !imageUrl) {
      setError("Пожалуйста, заполните обязательные поля: имя, цена, URL изображения.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/books/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          imageUrl,
          isAvailable,
          description,
          isPopular,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Ошибка при создании товара");
      }

      setName("");
      setPrice("");
      setImageUrl("");
      setIsAvailable(true);
      setDescription("");
      setIsPopular(false);

      onCreate();
    } catch (err) {
      const error = err as Error;
      setError(error.message || "Ошибка при создании товара");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-create-form p-6 max-w-lg mx-auto border rounded-md shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4">Создать новый товар</h2>
      {error && <p className="error-message text-red-600 mb-4">{error}</p>}
      <label className="block mb-3">
        Название*:
        <input
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="block mb-3">
        Цена*:
        <input
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))}
          required
          min="0"
          step="0.01"
        />
      </label>
      <label className="block mb-3">
        Фото*:
        <input
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="file"
          accept="image/*"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setImageUrl(reader.result as string);
              };
              reader.readAsDataURL(file);
            }
          }}
          required
        />
      </label>
      {imageUrl && (
        <div className="mb-3">
          <img src={imageUrl} alt="Preview" className="max-h-48 rounded" />
        </div>
      )}
      <label className="inline-flex items-center mb-3">
        <input
          className="mr-2"
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
        В наличии
      </label>
      <label className="block mb-3">
        Описание:
        <textarea
          className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <label className="inline-flex items-center mb-4">
        <input
          className="mr-2"
          type="checkbox"
          checked={isPopular}
          onChange={(e) => setIsPopular(e.target.checked)}
        />
        Популярное
      </label>
      <Button
        onClick={undefined}
        icon={null}
        text={loading ? "Создание..." : "Создать"}
        className="w-full"
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
      />
    </form>
  );
};

export default ProductCreateForm;
