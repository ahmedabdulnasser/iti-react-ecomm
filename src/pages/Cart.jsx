import React from "react";
import CartItem from "../components/CartItem";

export default function Cart({
  selectedItems,
  setSelectedItems,
  isLoading,
  setIsLoading,
  handleReset,
}) {
  function handleItemDelete(id) {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  }

  function handleIncrement(id) {
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  }

  function handleDecrement(id) {
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === id
          ? { ...item, count: item.count > 2 ? item.count - 1 : 1 }
          : item
      )
    );
  }

  return (
    <>
      {!isLoading ? (
        <>
          <button
            onClick={handleReset}
            className="btn btn-priamry bg-orange-300 hover:bg-orange-400 transition-all text-2xl mb-4"
          >
            Reset Cart
          </button>
          <section className="flex justify-center">
            <ul className="grid grid-cols-4 gap-5">
              {selectedItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleIncrement={() => {
                    handleIncrement(item.id);
                  }}
                  handleDecrement={() => {
                    handleDecrement(item.id);
                  }}
                  handleItemDelete={() => {
                    handleItemDelete(item.id);
                  }}
                />
              ))}
            </ul>
          </section>
        </>
      ) : (
        ""
      )}
    </>
  );
}
