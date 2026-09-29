import React, { useState, useEffect } from 'react';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((res) => res.json())
      .then((data) => {
        // Map TheMealDB response shape to product objects
        const formattedProducts = (data.meals || []).map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
          category: meal.strCategory,
          price: (Number(meal.idMeal) % 30 + 10).toFixed(2),
        }));

        setProducts(formattedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-10 text-center">Loading store data...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
      {products.map((item) => (
        <div key={item.id} className="border p-4 rounded-xl shadow-sm bg-white">
          <img src={item.image} alt={item.title} className="h-48 w-full object-cover rounded-lg mb-4" />
          <h3 className="font-bold text-sm line-clamp-1">{item.title}</h3>
          <p className="text-gray-500 text-xs capitalize">{item.category}</p>
          <div className="mt-3 flex justify-between items-center">
            <span className="font-bold text-lg">${item.price}</span>
            <button className="bg-black text-white px-3 py-1 text-xs rounded-lg hover:bg-gray-800 transition">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductPage;