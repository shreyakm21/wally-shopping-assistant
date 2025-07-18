import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[₹,]/g, '')) || 0;
    return sum + price;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate('/chat')}
        className="mb-6 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
      >
        ⬅️ Back to Chat
      </button>

      <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex gap-4 items-start bg-white dark:bg-gray-800 shadow rounded-lg p-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-28 h-20 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-blue-500 font-bold">{item.price}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">{item.features}</p>
                  <button
                    className="mt-2 text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => {
                        removeFromCart(index);
                        toast('Removed from cart.', { icon: '🗑️' });
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <p className="text-xl font-semibold">
              Total: <span className="text-green-600">₹{totalPrice.toLocaleString()}</span>
            </p>
            <button
            className="mt-3 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
            onClick={() => {
                toast.success('Checkout successful!');
                setTimeout(() => navigate('/checkout-success'), 1500); // optional delay

                }}
            >
            Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
