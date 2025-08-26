// src/pages/ProductDetailPage.jsx
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products.js';
import { useCart } from '../context/CartContext.jsx';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const { dispatch } = useCart();

  if (!product) {
    return <div className="text-center text-xl text-gray-600 py-20">Product not found</div>;
  }
  
  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-lg shadow-xl">
      <div className="md:col-span-2 flex justify-end -mb-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          ← Back to Home
        </Link>
      </div>
      <div className="flex items-center justify-center p-4 border border-gray-100 rounded-lg">
        <img src={product.image} alt={product.name} className="max-h-96" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">{product.name}</h1>
        <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
        <p className="text-3xl text-gray-800 font-semibold mb-6">${product.price}</p>
        <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>
        
        <div className="mt-auto"> {/* Pushes the button to the bottom if the description is short */}
          <button 
            onClick={handleAddToCart} 
            className="w-full bg-brand-blue-light text-white px-8 py-3 rounded-md hover:bg-brand-blue transition-transform transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}