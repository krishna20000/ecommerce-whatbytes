import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react'; // Import a nice icon for deleting

export default function CartPage() {
  const { state, dispatch } = useCart();

  const total = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemoveItem = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  if (state.items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4 text-gray-700">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="inline-flex items-center gap-2 text-[#0E5ACD] hover:text-[#0B4DB0] font-semibold">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Your Cart</h1>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          ← Back to Home
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {state.items.map(item => (
              <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-md transition-shadow hover:shadow-lg">
                <div className="w-24 h-24 mr-6 flex items-center justify-center border border-gray-200 rounded-md bg-white">
                  <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex-grow">
                  <h2 className="font-bold text-lg text-gray-800">{item.name}</h2>
                  <p className="text-gray-600 font-semibold">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center gap-2 mr-4">
                    <button
                      onClick={() =>
                        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity - 1 } })
                      }
                      className="h-8 w-8 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: e.target.value } })
                      }
                      className="w-14 text-center border border-gray-300 rounded h-8"
                    />
                    <button
                      onClick={() =>
                        dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, quantity: item.quantity + 1 } })
                      }
                      className="h-8 w-8 rounded border border-gray-300 text-gray-700 hover:bg-gray-50"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md sticky top-4">
            <h2 className="text-xl font-bold mb-4 border-b pb-4 text-gray-800">Order Summary</h2>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
             <div className="flex justify-between mb-4 text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-4 border-t pt-4 text-gray-900">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-[#0E5ACD] hover:bg-[#0B4DB0] text-white mt-6 py-3 rounded-md transition-all duration-200 transform hover:scale-105 font-semibold text-lg shadow-lg hover:shadow-xl">
              Proceed to Checkout
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}