import React from "react";

export default function CartItem({
  item,
  handleIncrement,
  handleDecrement,
  handleItemDelete,
}) {
  return (
    <li className="flex text-4xl">
      <div className="card bg-base-100 image-full w-96 shadow-sm h-[200px] relative">
        <figure>
          <img src={item.img} alt="Product Image" className="w-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{item.name}</h2>
          <p>Amount: {item.count}</p>
          <div className="card-actions justify-center">
            <button
              onClick={handleIncrement}
              className="btn btn-priamry bg-green-400 hover:bg-green-500 transition-all text-2xl "
            >
              +1
            </button>
            <button
              onClick={handleDecrement}
              className="btn btn-priamry bg-amber-400 hover:bg-amber-500 transition-all text-2xl dark:text-black"
            >
              -1
            </button>
            <button
              onClick={handleItemDelete}
              className="font-bold absolute h-8 w-8 top-2 right-2 btn btn-priamry bg-red-500 hover:bg-red-600 transition-all text-md "
            >
              X
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
