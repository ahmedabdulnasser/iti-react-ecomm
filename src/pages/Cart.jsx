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
          {selectedItems.length ? (
            <button
              onClick={handleReset}
              className="btn btn-priamry bg-orange-300 hover:bg-orange-400 transition-all text-2xl mb-4"
            >
              Reset Amount
            </button>
          ) : (
            <div className="flex flex-col gap-2 w-full h-96 justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>

              <p>Your cart is empty...</p>
            </div>
          )}
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
