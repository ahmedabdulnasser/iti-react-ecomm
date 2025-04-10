import React from "react";
const ItemRow = React.memo(
  ({
    item,
    editMode,
    dispatchEditMode,
    startEditing,
    cancelEditing,
    confirmEditing,
    handleDelete,
  }) => {
    const handleChange = (field, value) => {
      dispatchEditMode({ type: field, value });
    };

    const checkIfSelectedItem = (itemId) =>
      editMode.itemId == itemId ? !editMode.isEnabled : true;
    return (
      <>
        <tr key={item.id}>
          <th>{item.id}</th>
          <td>
            <input
              className="enabled:border-2 enabled:border-gray-200  enabled:rounded-lg "
              type="text"
              value={
                editMode.itemId == item.id
                  ? editMode.newItemData.name
                  : item.name
              }
              disabled={checkIfSelectedItem(item.id)}
              onChange={(e) => {
                handleChange("name", e.target.value);
              }}
            />
          </td>
          <td>
            <input
              className="enabled:border-2 enabled:border-gray-200  enabled:rounded-md "
              type="text"
              value={
                editMode.itemId == item.id
                  ? editMode.newItemData.count
                  : item.count
              }
              onChange={(e) => {
                handleChange("count", e.target.value);
              }}
              disabled={checkIfSelectedItem(item.id)}
            />
          </td>
          <td>
            <input
              className="enabled:border-2 enabled:border-gray-200  enabled:rounded-md "
              type="text"
              value={
                editMode.itemId == item.id
                  ? editMode.newItemData.category
                  : item.category
              }
              disabled={checkIfSelectedItem(item.id)}
              onChange={(e) => {
                handleChange("category", e.target.value);
              }}
            />
          </td>
          <td>
            <input
              className="enabled:border-2 enabled:border-gray-200  enabled:rounded-md "
              type="text"
              value={
                editMode.itemId == item.id ? editMode.newItemData.img : item.img
              }
              disabled={checkIfSelectedItem(item.id)}
              onChange={(e) => {
                handleChange("img", e.target.value);
              }}
            />
          </td>
          <td>
            {
              <input
                className="enabled:border-2 enabled:border-gray-200  enabled:rounded-md  "
                type="text"
                value={
                  editMode.itemId == item.id
                    ? editMode.newItemData.price
                    : item.price
                }
                disabled={checkIfSelectedItem(item.id)}
                onChange={(e) => {
                  handleChange("price", e.target.value);
                }}
              />
            }
          </td>
          {editMode.isEnabled && editMode.itemId == item.id ? (
            <td className="flex gap-1 ">
              {/* Confirm Edits Button */}
              <button
                className="cursor-pointer"
                onClick={() => {
                  // confirm logic goes here
                  confirmEditing();
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-green-600 hover:text-green-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>

              {/* Cancel Edits Button */}
              <button
                className="cursor-pointer"
                onClick={() => {
                  // cancel logic goes here
                  cancelEditing(item);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-red-600 hover:text-red-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </td>
          ) : (
            <td className="">
              <button
                className="cursor-pointer"
                onClick={() => {
                  startEditing(item);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 hover:text-sky-600 transition-all"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </td>
          )}
          <td>
            {/* Delete Btn */}
            <button className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 hover:text-red-600 transition-all"
                onClick={() => {
                  handleDelete(item.id);
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </td>
        </tr>
      </>
    );
  },
  // Comparison function so we don't re-render the row if it wasn't changed
  (prev, next) => {
    if (prev.item != next.item) return false; // re-render if item was changed
    const isEditing = next.editMode.itemId == next.item.id;
    const wasEditing = prev.editMode.itemId == prev.item.id;
    if (wasEditing || isEditing) return false; // re-render if item is being edited or was edited
    return true; // don't re-render otherwise
  }
);

export default ItemRow;
