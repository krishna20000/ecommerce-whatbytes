// src/pages/HomePage.jsx
import { useState } from 'react';
import { useCart } from '../context/CartContext.jsx';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products.js';

export default function HomePage() {
  const [category, setCategory] = useState('All');
  const [price, setPrice] = useState(1000);
  const { dispatch } = useCart();

  const filteredProducts = products.filter(product => {
    const categoryMatch = category === 'All' || product.category === category;
    const priceMatch = product.price <= price;
    const notSmartphone = product.name !== 'Smartphone';
    return categoryMatch && priceMatch && notSmartphone;
  });

  const featuredProduct = products.find(p => p.name === 'Smartphone');
  const isFeaturedVisible = featuredProduct && (category === 'All' || featuredProduct.category === category) && featuredProduct.price <= price;
  const handleAddFeatured = () => {
    if (featuredProduct) {
      dispatch({ type: 'ADD_ITEM', payload: featuredProduct });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* Sidebar */}
      <aside className="md:col-span-1 space-y-6 self-start">
        {/* Primary filter card (blue) */}
        <div className="bg-gradient-to-b from-[#1B4C8F] to-[#0E376B] text-white p-6 rounded-xl shadow-lg border border-white/10">
          <h2 className="text-xl font-semibold mb-6">Filters</h2>
          <div>
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-3">
              {['All', 'Electronics', 'Clothing', 'Home'].map(cat => (
                <label key={cat} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={e => setCategory(e.target.value)}
                    className="h-4 w-4 accent-brand-blue-light"
                  />
                  <span className="text-white/95">{cat}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-medium mb-3">Price</h3>
            <input
              type="range"
              min="0"
              max="1000"
              value={price}
              onChange={e => setPrice(Number(e.target.value))}
              className="w-full accent-brand-blue-light"
            />
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-white/80">0</span>
              <span className="text-white/80">1000</span>
            </div>
          </div>
        </div>

        {/* Secondary filter card (white) */}
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <h3 className="text-gray-900 font-semibold mb-4">Cacyroy</h3>
          <div className="space-y-3 text-gray-800">
            {['All', 'Electronics', 'Clothing', 'Home'].map(label => (
              <label key={label} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="brandFilter" className="h-4 w-4 accent-brand-blue" defaultChecked={label==='All'} />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <div className="mt-6">
            <h4 className="text-gray-900 font-semibold mb-2">Price</h4>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-800">
              <option>5000</option>
              <option>10000</option>
              <option>20000</option>
            </select>
          </div>
        </div>
      </aside>

      {/* Product Grid */}
      <div className="md:col-span-3">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">Product Listing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              product.name === 'T-shirt' ? (
                <>
                  <ProductCard key={product.id} product={product} />
                  {isFeaturedVisible && (
                    <div key="featured-smartphone" className="md:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                        <div className="flex items-center justify-center">
                          <img src={featuredProduct.image} alt={featuredProduct.name} className="max-h-96 object-contain" />
                        </div>
                        <div className="flex flex-col">
                          <h3 className="text-3xl font-semibold text-gray-900 mb-2">{featuredProduct.name}</h3>
                          <p className="text-2xl font-bold text-gray-800 mb-2">${featuredProduct.price}</p>
                          <div className="flex items-center gap-1 mb-4 text-[#0E5ACD]">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i}>{i < featuredProduct.rating ? '★' : '☆'}</span>
                            ))}
                          </div>
                          <p className="text-gray-600 mb-4">{featuredProduct.description}</p>
                          <div className="text-sm text-gray-700 space-y-1 mb-6">
                            <p><span className="font-semibold">Category</span></p>
                            <p>{featuredProduct.category}</p>
                          </div>
                          <div className="mt-auto">
                            <button onClick={handleAddFeatured} className="w-full md:w-auto bg-[#0E5ACD] hover:bg-[#0B4DB0] text-white px-6 py-3 rounded-md">
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <ProductCard key={product.id} product={product} />
              )
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}