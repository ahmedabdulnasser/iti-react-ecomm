import React from "react";
import Product from "../components/Product";
import CategoryMenu from "../components/CategoryMenu";

export default function Products({
  filteredItems,
  setFilteredItems,
  isLoading,
  handleAddToCart,
  categories,
  handleCategoryChange,
  selectedCategory,
  selectedItems,
  setSelectedItems,
}) {
  return (
    <>
      {isLoading ? (
        <div className="flex w-full h-96 justify-center items-center">
          <span className="loading loading-bars w-16 bg-orange-500"></span>
        </div>
      ) : (
        <section className="flex gap-4 justify-start">
          <CategoryMenu
            categories={categories}
            setFilteredItems={setFilteredItems}
            handleCategoryChange={handleCategoryChange}
            selectedCategory={selectedCategory}
          />
          <ul className="grid grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <Product
                key={item.id}
                item={item}
                handleAddToCart={handleAddToCart}
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
              />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
