import React from "react";

export const Categorias = () => {
  return (
    <div className="mb-6 mt-6">
      <h3 className="text-lg font-bold mb-2">Categorias</h3>
      <div className="flex flex-nowrap gap-2 items-center overflow-x-auto scrollbar-hide ">
        {categories.map((category, index) => (
          <Button
            variant="bordered"
            key={index}
            className={`font-bold min-w-max whitespace-nowrap  ${
              selectedCategory === category
                ? " bg-orange-100 text-primary border-orange-500"
                : "bg-white text-black border-black"
            }`}
            onClick={(e) => setSelectedCategory(e.target.innerText)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};
