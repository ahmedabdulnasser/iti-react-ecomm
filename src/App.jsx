import "./assets/index.css";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route } from "react-router";
import Products from "./pages/Products";
import Search from "./components/Search";
import PageNumbers from "./components/PageNumbers";
import Admin from "./pages/Admin";

import ItemContext from "./context/ItemContext";
import ItemAddPanel from "./components/ItemAddPanel";

function App() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [inventorySearchTerm, setInventorySearchTerm] = useState("");
  const [isAddingItem, setIsAddingItem] = useState(false);

  const categories = Array.from(new Set(items.map((item) => item.category)));
  const noPages = Math.ceil(filteredItems.length / 12);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setFilteredItems(data);
        setIsLoading(false);
      });
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    const newFilteredItems = items.filter((item) => {
      const isInSameCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return (
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        isInSameCategory
      );
    });
    setCurrentPage(1);
    setFilteredItems(newFilteredItems);
  }, [searchTerm, items]);

  const inventoryFilteredItems = useMemo(() => {
    const newFilteredItems = items.filter(
      (item) =>
        item.name.toLowerCase().includes(inventorySearchTerm.toLowerCase()) ||
        String(item.id) === inventorySearchTerm ||
        item.category.toLowerCase().includes(inventorySearchTerm.toLowerCase())
    );
    return newFilteredItems;
  }, [inventorySearchTerm, items]);

  const noCartItems = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.count, 0);
  }, [selectedItems]);

  const currentPageItems = useMemo(() => {
    const start = (currentPage - 1) * 12;
    const end = currentPage * 12;
    return filteredItems.slice(start, end);
  }, [currentPage, filteredItems, items]);

  function handleChangePage(pageNum) {
    setCurrentPage(pageNum);
  }

  function handleReset() {
    setSelectedItems(selectedItems.map((item) => ({ ...item, count: 1 })));
  }
  function handleAddToCart(id) {
    const foundItem = selectedItems.find((item) => item.id === id);
    if (!foundItem) {
      const itemToAdd = items.find((item) => item.id === id);
      setSelectedItems([...selectedItems, { ...itemToAdd, count: 1 }]);
    }
  }

  function handleCategoryChange(category) {
    const newFilteredItems =
      category === "all"
        ? items
        : items.filter((item) => item.category === category);
    setSelectedCategory(category);
    setFilteredItems(newFilteredItems);
    setSearchTerm("");
    setCurrentPage(1);
  }

  function handleSearch(e) {
    if (e.target.value) {
      setSearchTerm(e.target.value);
    } else {
      setSearchTerm("");
    }
  }

  function handleInventorySearch(e) {
    if (e.target.value) {
      setInventorySearchTerm(e.target.value);
    } else {
      setInventorySearchTerm("");
    }
  }

  return (
    <BrowserRouter>
      <>
        <Navbar noCartItems={noCartItems} />
        <main className="py-4 font-underdog">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <div className="flex gap-2 justify-center items-center w-full">
                    <Search
                      searchTerm={searchTerm}
                      handleSearch={handleSearch}
                    />
                  </div>
                  <Products
                    filteredItems={currentPageItems}
                    setFilteredItems={setFilteredItems}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    handleAddToCart={handleAddToCart}
                    categories={categories}
                    selectedCategory={selectedCategory}
                    handleCategoryChange={handleCategoryChange}
                    selectedItems={selectedItems}
                    setSelectedItems={setSelectedItems}
                  />
                  <PageNumbers
                    noPages={noPages}
                    currentPage={currentPage}
                    handleChangePage={handleChangePage}
                  />
                </>
              }
            />
            <Route
              path="/cart"
              element={
                <Cart
                  selectedItems={selectedItems}
                  setSelectedItems={setSelectedItems}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  handleReset={handleReset}
                />
              }
            />
            <Route
              path="/admin"
              element={
                <>
                  <ItemContext.Provider
                    value={{
                      filteredItems: inventoryFilteredItems,
                      items: items,
                      setItems: setItems,
                    }}
                  >
                    <div className="flex gap-2 justify-center w-full">
                      <button
                        className="btn"
                        onClick={() => setIsAddingItem(true)}
                      >
                        Add New Item
                      </button>
                      <ItemAddPanel
                        isAddingItem={isAddingItem}
                        setIsAddingItem={setIsAddingItem}
                        setItems={setItems}
                        items={items}
                      />
                      <Search
                        searchTerm={inventorySearchTerm}
                        handleSearch={handleInventorySearch}
                      />
                    </div>
                    <Admin />
                  </ItemContext.Provider>
                </>
              }
            />
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
