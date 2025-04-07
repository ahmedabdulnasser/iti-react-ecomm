import React from "react";

export default function CategoryMenu({
  categories,
  handleCategoryChange,
  selectedCategory,
}) {
  return (
    <ul className="menu bg-base-200 rounded-box h-full w-44 shrink-0 grow-0 font-semibold">
      <li>
        <h2 className="menu-title">Categories</h2>
        <ul>
          <li>
            <button
              onClick={() => handleCategoryChange("all")}
              className={`${selectedCategory === "all" ? "menu-active" : ""}`}
            >
              All
            </button>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <button
                onClick={() => {
                  handleCategoryChange(category);
                }}
                className={`${
                  selectedCategory === category ? "menu-active" : ""
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
}
