import React from "react";
import { useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
export default function ItemAddPanel({
  isAddingItem,
  setIsAddingItem,
  setItems,
  items,
}) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    count: "",
    img: "",
  });
  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="my_modal_2" className="modal" open={isAddingItem}>
        <div className="modal-box w-fit md:!w-2xl">
          <h3 className="font-bold text-lg">Add a new item</h3>

          <form>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Product name</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type here"
                name={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Category</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type here"
                name={formData.category}
                onChange={(e) => {
                  setFormData({ ...formData, category: e.target.value });
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Amount</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type here"
                name={formData.count}
                onChange={(e) => {
                  setFormData({ ...formData, count: parseInt(e.target.value) });
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Image URL</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type here"
                name={formData.img}
                onChange={(e) => {
                  setFormData({ ...formData, img: e.target.value });
                }}
              />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Price</legend>
              <input
                type="text"
                className="input w-full"
                placeholder="Type here"
                name={formData.price}
                onChange={(e) => {
                  setFormData({ ...formData, price: parseInt(e.target.value) });
                }}
              />
            </fieldset>

            <span className="mt-4 flex gap-2 w-full justify-center">
              <button
                type="submit"
                className=" btn btn-active btn-success text-white"
                onClick={(e) => {
                  e.preventDefault();
                  const errors = validateProduct(formData);
                  console.log(errors);
                  if (Object.keys(errors).length > 0) {
                    for (const property in errors) {
                      toast.error(errors[property]);
                    }
                  } else {
                    fetch("http://localhost:3000/posts", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        id: items.length + 1,
                        name: formData.name.trim(),
                        category: formData.category.trim(),
                        count: formData.count,
                        price: formData.price,
                        img: formData.img.trim(),
                      }),
                    })
                      .then((res) => {
                        if (!res.ok) {
                          toast.error(res.status);
                        }
                        return res.json();
                      })
                      .then(() => {
                        const newItem = { ...formData, id: items.length + 1 };
                        setItems([...items, newItem]);
                        toast.success(
                          "Item has been added successfully to the inventory."
                        );
                        setFormData({});
                        setIsAddingItem(false);
                      });
                  }
                }}
              >
                Add new item
              </button>
              <button
                type="button"
                className=" btn btn-active btn-error text-white"
                onClick={() => {
                  setIsAddingItem(false);
                }}
              >
                Cancel
              </button>
            </span>
          </form>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button
            className="!cursor-default"
            onClick={() => setIsAddingItem(false)}
          >
            close
          </button>
        </form>
      </dialog>
      <ToastContainer />
    </>
  );
}

function validateProduct({ name, category, count, img, price }) {
  const errors = {};

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long.";
  }

  if (
    !category ||
    typeof category !== "string" ||
    category.trim().length === 0
  ) {
    errors.category = "Category is required.";
  }

  if (typeof count !== "number" || count < 0 || !Number.isInteger(count)) {
    errors.count = "Amount must be a non-negative integer.";
  }

  const urlRegex = /^https?:\/\/.*\.(png|jpg|jpeg|gif|webp)$/i;

  const cleanUrl = img?.replace(/[\u200B-\u200D\uFEFF]/g, "").trim();

  if (!cleanUrl || !urlRegex.test(cleanUrl)) {
    errors.img =
      "Image URL must be a valid http or https link ending in .png, .jpg, .jpeg, .gif, or .webp.";
  }

  if (typeof price !== "number" || price < 0) {
    errors.price = "Price must be a non-negative number.";
  }

  return errors;
}
