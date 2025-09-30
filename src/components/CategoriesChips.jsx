import React, { useState } from "react";
import { useGetCategoryQuery } from "../store/services/categoryApi";
import { useCategory } from "../context/CategoryContext";

function CategoriesChips() {
  const { data, isLoading } = useGetCategoryQuery();
  
  const {selectCategory,setSelectCategory} = useCategory()

  if (isLoading) return <p>Loading categories...</p>;

  // API se categories list
  const categories = ["All", ...(data?.data?.map((cat) => cat.name) || [])];

  return (
    <div className="w-full flex flex-wrap justify-center gap-3 py-6 bg-base-200">
      {categories.map((category, index) => (
        <span
          key={index}
          onClick={() => setSelectCategory(category)}
          className={`badge badge-lg px-4 py-3 cursor-pointer transition-all ${
            selectCategory === category
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
