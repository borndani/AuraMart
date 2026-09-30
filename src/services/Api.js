// src/services/api.js

const BASE_URL = 'https://fakestoreapi.com';

/**
 * Fetch all products from FakeStoreAPI
 */
export async function fetchProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch products by a specific category
 */
export async function fetchProductsByCategory(categoryName) {
  try {
    const response = await fetch(`${BASE_URL}/products/category/${categoryName}`);
    if (!response.ok) throw new Error(`Failed to fetch category ${categoryName}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching category ${categoryName}:`, error);
    return [];
  }
}

/**
 * Fetch all available categories
 */
export async function fetchCategories() {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}