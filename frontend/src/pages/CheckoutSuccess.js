import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

function CheckoutSuccess() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((sum, item) => {
    const price = parseInt(item.price.replace(/[₹,]/g, '')) || 0;
    return sum + price;
  }, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">✅ Order Placed Successfully!</h2>
      <p className="mb-6 text-gray-600">Thanks for shopping with Wally.</p>

      <div className="grid gap-4 mb-6">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white dark:bg-gray-800 shadow p-4 rounded"
          >
            <img src={item.image} alt={item.name} className="w-20 h-16 object-cover rounded" />
            <div className="text-left">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-sm text-blue-500">{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xl font-semibold mb-4">
        Total Paid: <span className="text-green-600">₹{totalPrice.toLocaleString()}</span>
      </p>

      <button
        onClick={() => {
          clearCart();
          navigate('/');
        }}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        ⬅️ Back to Shopping
      </button>
    </div>
  );
}

export default CheckoutSuccess;
