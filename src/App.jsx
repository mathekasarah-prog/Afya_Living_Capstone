import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Categories from './components/Categories';
import SortControl from './components/SortControl';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import Signup from './components/Signup';
import Login from './components/Login';
import Contact from './components/Contact';
import About from './components/About';
import Admin from './components/Admin';
import { apiRequest } from './api';

function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('afya-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('afya-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('default');

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiRequest('/api/products')
  .then((data) => {
    setProducts(data);
    setLoading(false);
  })
  .catch((err) => {
    setError(err.message);
    setLoading(false);
  });
  }, []);

  useEffect(() => {
    localStorage.setItem('afya-cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('afya-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('afya-user');
    }
  }, [user]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleOrderComplete = () => {
    setCart([]);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = ['All', ...new Set(products.map((p) => p.category))];

  let filteredProducts =
    selectedCategory === 'All'
      ? [...products]
      : products.filter((p) => p.category === selectedCategory);

  if (sortOption === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortOption === 'name-asc') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  return (
    <div className="app">
      <Header
        cartCount={cartCount}
        onCartClick={() => setIsCartOpen(true)}
        user={user}
        onLogout={handleLogout}
      />
      {isCartOpen && (
        <Cart
          items={cart}
          onClose={() => setIsCartOpen(false)}
          onRemove={handleRemoveFromCart}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
      <main>
        <Routes>
          <Route
  path="/"
  element={
    <>
      <Hero />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#708c63]">
            Your self-care essentials
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#102a22] sm:text-4xl">
            Shop our collection
          </h2>

          <p className="mt-3 max-w-2xl leading-7 text-gray-600">
            Find your new favourites for skincare, hair care and everyday
            wellness.
          </p>
        </div>

                {loading && <p>Loading products...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {!loading && !error && (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <Categories
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
              <SortControl
                sortOption={sortOption}
                onSortChange={setSortOption}
              />
            </div>

            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </>
        )}
      </section>
    </>
  }
/>
          <Route
            path="/product/:id"
            element={<ProductDetail onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/checkout"
            element={<Checkout cart={cart} onOrderComplete={handleOrderComplete} />}
          />
          <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
          <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<Admin user={user} />} />
        </Routes>
      </main>
      <Footer user={user} />
    </div>
  );
}

export default App;