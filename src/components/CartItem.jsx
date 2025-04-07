import React from "react";

export default function CartItem({
  item,
  handleIncrement,
  handleDecrement,
  handleItemDelete,
}) {
  return (
    <li className="flex text-4xl">
      <div className="card bg-base-100 image-full w-96 shadow-sm h-[200px]">
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
              className="btn btn-priamry bg-red-400 hover:bg-red-500 transition-all text-2xl "
            >
              DEL
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

{
  /* <p>{item.name}</p>
      <span>{item.count}</span>
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
        className="btn btn-priamry bg-red-400 hover:bg-red-500 transition-all text-2xl "
      >
        DEL
      </button> */
}
