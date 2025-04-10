import React, {
  useCallback,
  useReducer,
  useContext,
  useState,
  useMemo,
} from "react";

import ItemContext from "../context/ItemContext";
import ItemRow from "./ItemRow";

export default function ItemTable() {
  const itemContext = useContext(ItemContext);
  const filteredItems = itemContext.filteredItems;
  const allItems = itemContext.items;
  const setAllItems = itemContext.setItems;

  const initialEditState = {
    isEnabled: false,
    itemId: -1,
    newItemData: {},
  };
  function editReducer(state, action) {
    switch (action.type) {
      case "start":
        return {
          isEnabled: true,
          itemId: action.item.id,
          newItemData: { ...action.item },
        };
      case "name":
      case "count":
      case "img":
      case "category":
      case "price":
        return {
          ...state,
          newItemData: {
            ...state.newItemData,
            [action.type]: action.value,
          },
        };

      case "cancel":
        return initialEditState;
      default:
        return state;
    }
  }
  const [editMode, dispatchEditMode] = useReducer(
    editReducer,
    initialEditState
  );

  const startEditing = useCallback(
    (item) => dispatchEditMode({ type: "start", item }),
    []
  );
  const cancelEditing = useCallback(
    () => dispatchEditMode({ type: "cancel" }),
    []
  );
  const confirmEditing = useCallback(() => {
    fetch(`http://localhost:3000/posts/${editMode.itemId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editMode.newItemData),
    })
      .then((res) => res.json())
      .then((updatedItem) => {
        const updatedItems = allItems.map(
          (item) => (item.id == updatedItem.id ? updatedItem : item),
          []
        );
        setAllItems(updatedItems);
        dispatchEditMode({ type: "cancel" });
      });
  }, [allItems, editMode]);

  const handleDelete = useCallback(
    (id) => {
      fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Deleted", data);
          setAllItems(allItems.filter((item) => item.id != id));
        });
    },
    [allItems]
  );

  return (
    <>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Amount</th>
              <th>Category</th>
              <th>Image URL</th>
              <th>Price</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => {
                return (
                  <ItemRow
                    key={item.id}
                    item={item}
                    editMode={editMode}
                    dispatchEditMode={dispatchEditMode}
                    startEditing={startEditing}
                    cancelEditing={cancelEditing}
                    confirmEditing={confirmEditing}
                    handleDelete={handleDelete}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan="8">
                  <p className="flex justify-center items-center h-96">
                    No items found...
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
