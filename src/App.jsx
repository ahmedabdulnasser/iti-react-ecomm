import "./assets/index.css";
import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import { BrowserRouter, Routes, Route } from "react-router";
import Products from "./pages/Products";
import Search from "./components/Search";
import PageNumbers from "./components/PageNumbers";

function App() {
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
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
  }, [searchTerm]);

  const noCartItems = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.count, 0);
  }, [selectedItems]);

  const currentPageItems = useMemo(() => {
    const start = (currentPage - 1) * 12;
    const end = currentPage * 12;
    return filteredItems.slice(start, end);
  }, [currentPage, filteredItems]);

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

  return (
    <BrowserRouter>
      <>
        <Navbar noCartItems={noCartItems} />
        <main className="p-4 font-underdog">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Search searchTerm={searchTerm} handleSearch={handleSearch} />
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
          </Routes>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
