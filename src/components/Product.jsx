import React from "react";

export default function Product({
  item,
  handleAddToCart,
  selectedItems,
  setSelectedItems,
}) {
  const isInCart = selectedItems.find((selected) => selected.id === item.id);
  return (
    <li className="flex flex-wrap text-4xl">
      <div className="card bg-base-100 image-full w-96 shadow-sm h-[200px]">
        <figure>
          <img src={item.img} alt="Product Image" className="w-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item.name}</h2>
          <p className="text-xl text-green-600">{item.price}$</p>
          <div className="card-actions justify-center">
            <button
              onClick={() => {
                handleAddToCart(item.id);
                isInCart
                  ? setSelectedItems(
                      selectedItems.filter(
                        (selected) => selected.id !== item.id
                      )
                    )
                  : "";
              }}
              className={`btn btn-priamry ${
                isInCart
                  ? "bg-blue-400 hover:bg-blue-500"
                  : "bg-orange-400 hover:bg-orange-500"
              } transition-all text-md `}
            >
              {isInCart ? "Remove from cart" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
