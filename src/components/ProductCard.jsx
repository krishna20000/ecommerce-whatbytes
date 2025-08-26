// src/components/ProductCard.jsx
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addItemToCart } = useCart();

  const handleAddToCart = () => {
    addItemToCart(product);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center shadow-md bg-white transition-all duration-300 hover:shadow-xl hover:scale-105">
      <Link to={`/product/${product.id}`} className="w-full">
        <div className="w-full h-48 relative mb-4">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
        </div>
        <h3 className="font-semibold text-lg text-gray-900">{product.name}</h3>
      </Link>
      <p className="text-gray-800 font-bold my-2">${product.price}</p>
      <button 
        onClick={handleAddToCart} 
        className="bg-[#0E5ACD] text-white px-6 py-2 rounded-md hover:bg-[#0B4DB0] transition-colors w-full"
      >
        Add to Cart
      </button>
    </div>
  );
}