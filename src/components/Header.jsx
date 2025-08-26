// src/components/Header.jsx
import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { state } = useCart();
  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    // Force brand gradient background to ensure no overrides keep it white
    <header className="bg-gradient-to-r from-[#16427C] to-[#3A70B7] shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo in white */}
        <Link to="/" className="text-2xl font-bold text-white transition-opacity hover:opacity-80">
          Logo
        </Link>
        <div className="relative flex-grow max-w-lg mx-4">
          <input
            type="text"
            placeholder="Search for products..."
            // White text on brand blue header, transparent input with subtle white border
            className="w-full bg-transparent py-2 pl-10 pr-4 rounded-md border border-white/40 text-white placeholder-white/80 focus:outline-none focus:ring-2 focus:ring-white/60"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/80" size={20} />
        </div>
        {/* Cart button with count badge on the left and label */}
        <div className="relative flex items-center">
          {cartItemCount > 0 && (
            <span className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white text-brand-blue text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center shadow">
              {cartItemCount}
            </span>
          )}
          <Link
            to="/cart"
            className="pl-4 pr-3 py-2 bg-blue-900 text-white rounded-md transition-opacity hover:opacity-80 flex items-center gap-2"
            aria-label="Open cart"
          >
            <ShoppingCart size={20} />
            <span className="text-sm font-medium">Cart</span>
          </Link>
        </div>
      </div>
    </header>
  );
}