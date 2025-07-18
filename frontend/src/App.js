/*import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ChatBox from './components/ChatBox';
import ThemeToggle from './components/ThemeToggle';
import CartPage from './pages/CartPage';
import ComparePage from './pages/ComparePage';
import CheckoutSuccess from './pages/CheckoutSuccess';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <Router>
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <div className="max-w-4xl mx-auto py-6 px-4">
            <div className="flex justify-between items-center mb-4">
              <Link to="/" className="text-3xl font-bold">🛍️ Wally</Link>
              <div className="flex gap-4 items-center">
                <Link
                  to="/cart"
                  className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition text-sm">
                  View Cart
                </Link>
                <Link to="/compare" className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600">
                  Compare
                </Link>
                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </div>
            </div>

            <Routes>
              <Route path="/" element={<ChatBox />} />
              <Route path="/chat" element={<ChatBox />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/checkout-success" element={<CheckoutSuccess />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
*/

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ChatBox from './components/ChatBox';
import CartPage from './pages/CartPage';
import ComparePage from './pages/ComparePage';
import CheckoutSuccess from './pages/CheckoutSuccess';
import HomePage from './pages/HomePage';
import CategoryPrompts from './pages/CategoryPrompts'; // ✅ Already imported
import ThemeToggle from './components/ThemeToggle';
import { Toaster } from 'react-hot-toast';

function Layout({ children, darkMode, setDarkMode }) {
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="max-w-4xl mx-auto py-6 px-4">
          <div className="flex justify-between items-center mb-4">
            <Link to="/" className="text-3xl font-bold">🛍️ Wally</Link>
            <div className="flex gap-4 items-center">
              <Link
                to="/cart"
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition text-sm">
                View Cart
              </Link>
              <Link to="/compare" className="bg-purple-500 text-white px-3 py-1 rounded text-sm hover:bg-purple-600">
                Compare
              </Link>
              <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

function AppWrapper() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(true);

  const isHome = location.pathname === '/';

  return (
    <>
      <Toaster position="top-right" />
      {isHome ? (
        <HomePage />
      ) : (
        <Layout darkMode={darkMode} setDarkMode={setDarkMode}>
          <Routes>
            <Route path="/chat" element={<ChatBox />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/checkout-success" element={<CheckoutSuccess />} />
            <Route path="/category/:categoryName" element={<CategoryPrompts />} /> {/* ✅ NEW route */}
          </Routes>
        </Layout>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<AppWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;




