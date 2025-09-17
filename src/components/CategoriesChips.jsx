import React, { useState } from "react";

function CategoriesChips() {
  // Categories list (All by default first)
  const categories = [
    "All",
    "Technology",
    "Health",
    "Travel",
    "Lifestyle",
    "Education",
    "Business",
    "Food",
    "Sports",
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="w-full flex flex-wrap justify-center gap-3 py-6 bg-base-200">
      {categories.map((category, index) => (
        <span
          key={index}
          onClick={() => setActiveCategory(category)}
          className={`badge badge-lg px-4 py-3 cursor-pointer transition-all ${
            activeCategory === category
              ? "bg-primary text-white shadow-md"
              : "bg-base-100 text-base-content hover:bg-primary hover:text-white"
          }`}
        >
          {category}
        </span>
      ))}
    </div>
  );
}

export default CategoriesChips;
