import React from "react";

export default function PageNumbers({
  noPages,
  currentPage,
  handleChangePage,
}) {
  const pagesButtons = [];
  for (let i = 0; i < noPages; i++) {
    pagesButtons.push(
      <input
        key={i + 1}
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label={i + 1}
        checked={currentPage === i + 1 ? "checked" : ""}
        onChange={() => {
          handleChangePage(i + 1);
        }}
      />
    );
  }
  return <div className="join flex justify-center my-2">{pagesButtons}</div>;
}
