"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [material, setMaterial] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true); // Track whether there are more images to load
  const clientId = "50v8Gu7mFS6HTQ3DQn4alaMkAxwoLkpvPI9tdY7mNow";
  const itemsPerPage = 10;

  const fetchImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/photos/random?query=jewelry&client_id=${clientId}&count=${itemsPerPage}&page=${page}`
      );
      const data = await response.json();
      const enhancedData = data.map((image) => ({
        ...image,
        price: (Math.random() * 1000).toFixed(2),
        category: "Jewelry",
        description: image.alt_description || "No description available",
      }));

      let filtered = filterByMaterial(material, enhancedData);
      filtered = filterBySearch(searchQuery, filtered);
      filtered = sortImages(filtered, sortOrder);

      // If there are fewer images than requested, there are no more images to load
      setHasMore(data.length === itemsPerPage);

      setImages((prev) => [...prev, ...enhancedData]);
      setFilteredImages(filtered);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [material, searchQuery, sortOrder, page]); // Depend on page to refetch images

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const filterByMaterial = (material, images) => {
    if (!material) return images;
    return images.filter((image) =>
      image.alt_description?.toLowerCase().includes(material.toLowerCase())
    );
  };

  const filterBySearch = (searchQuery, images) => {
    if (!searchQuery) return images;
    return images.filter((image) =>
      image.alt_description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const sortImages = (images, sortOrder) => {
    return images.sort((a, b) =>
      sortOrder === "asc"
        ? new Date(a.created_at) - new Date(b.created_at)
        : new Date(b.created_at) - new Date(a.created_at)
    );
  };

  const handleAddToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle loading more images
  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1); // Increment the page number
  };

  return (
    <div className="mx-auto">
      {/* Top Header */}
      <div className="bg-white shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-6 p-4  w-full back ">
        <nav aria-label="Main navigation" className="mb-4 sm:mb-0">
          <Link
            href="/"
            className="text-2xl font-bold border-2 border-transparent hover:border-black transition duration-300 p-1"
          >
            ambar
          </Link>
        </nav>

        <div className="mt-8 text-center">
          <Link
            href="/cart"
            className="text-lg text-gray-700 font-semibold border-2 border-transparent hover:border-black transition duration-300 p-2"
          >
            🛒 ({cart.length} items)
          </Link>
        </div>

        {/* Filters Section */}
        <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
          <div className="flex-1 min-w-0">
            <input
              id="search"
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black-500 focus:border-black-500 transition-all"
              placeholder="Search by description"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[140px] max-w-[200px]">
              <select
                id="material"
                className="w-full px-4 py-3 cursor-pointer transition-all border-2 border-transparent hover:border-black transition duration-300"
                onChange={(e) => setMaterial(e.target.value)}
              >
                <option value="">All Materials</option>
                <option value="gold">Gold</option>
                <option value="silver">Silver</option>
                <option value="diamond">Diamond</option>
              </select>
            </div>

            <div className="flex-1 min-w-[140px] max-w-[200px]">
              <select
                id="collection"
                className="w-full px-4 py-3 border-2 border-transparent hover:border-black transition duration-300 cursor-pointer transition-all"
                onChange={(e) => setMaterial(e.target.value)} // For now, use material for this
              >
                <option value="">All Collections</option>
                <option value="necklace">Necklace</option>
                <option value="bracelet">Bracelet</option>
                <option value="ring">Ring</option>
                <option value="earring">Earring</option>
              </select>
            </div>

            <div className="flex-1 min-w-[140px] max-w-[200px]">
              <select
                id="sort"
                className="w-full px-4 py-3 border-2 border-transparent hover:border-black transition duration-300 cursor-pointer transition-all"
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center nav bg-black text-white">
        <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold mb-4">
          EXPLORE OUR
        </h1>
        <span className="text-orange-300 text-xl sm:text-2xl font-bold lg:text-4xl ">
          LUXURY - JEWELRY
        </span>
      </div>

      {/* Product Grid */}
      <div className="w-full flex justify-center">
        <div className="grid w-full gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-items-center p-5">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="price rounded-2xl overflow-hidden hover:shadow-xl transition duration-300 max-w-xs"
            >
              <img
                src={image.urls.small}
                className="w-full h-48 object-cover"
                alt={image.alt_description}
              />
              <div className="">
                <p className="text-gray-800 text-lg font-semibold">
                  <strong>Price:</strong> ${image.price}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Category:</strong> {image.category}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Description:</strong> {image.description}
                </p>
                {/* Add to Cart Button */}
                <button
                  className="px-2 py-3 cursor-pointer"
                  onClick={() => handleAddToCart(image)}
                >
                  🛒
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="mt-8 text-center">
          <button
            onClick={loadMoreImages}
            className="bg-gradient-to-r from-amber-700 to-yellow-300 text-white font-semibold tracking-wide px-7 py-3 rounded-full shadow-md  transition-all duration-300 focus:outline-none cursor-pointer"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
