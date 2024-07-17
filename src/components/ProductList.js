import React, { useState } from 'react';
import ProductCard from './ProductCard';
import CartPopup from './CartPopup';
import CartButton from './CartButton';
import BestSellerCard from './BestSellerCard';
import './ProductList.css';
import Drug1 from './assets/drug1.jpg';
import Drug2 from './assets/drug2.jpg';
import Drug3 from './assets/drug3.jpg';
import Drug4 from './assets/drug4.jpg';
import Drug5 from './assets/drug5.jpg';
import bestSellerImage from './assets/bestSellerImage.jpg';

const products = [
  {
    id: 1,
    image: Drug1,
    title: 'Produit 1',
    description: 'Description 1',
    price: 10,
  },
  {
    id: 2,
    image: Drug2,
    title: 'Produit 2',
    description: 'Description 2',
    price: 10,
  },
  {
    id: 3,
    image: Drug3,
    title: 'Produit 3',
    description: 'Description 3',
    price: 10,
  },
  {
    id: 4,
    image: Drug4,
    title: 'Produit 4',
    description: 'Description 4',
    price: 10,
  },
  {
    id: 5,
    image: Drug5,
    title: 'Produit 5',
    description: 'Description 5',
    price: 10,
  },
];

const bestSeller = {
  id: 6,
  image: bestSellerImage,
  title: 'Produit 6',
  description: 'Description 6',
  price: 10,
  rating: 4.6,
};

const ProductList = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleIncreaseQuantity = (productId, amount) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(item => item.id === productId);
    if (existingItemIndex >= 0) {
      updatedCartItems[existingItemIndex].quantity += amount;
    } else {
      const product = products.find(p => p.id === productId) || bestSeller;
      updatedCartItems.push({ ...product, quantity: amount });
    }
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (productId, amount) => {
    const updatedCartItems = [...cartItems];
    const existingItemIndex = updatedCartItems.findIndex(item => item.id === productId);
    if (existingItemIndex >= 0 && updatedCartItems[existingItemIndex].quantity > 0) {
      updatedCartItems[existingItemIndex].quantity -= amount;
      if (updatedCartItems[existingItemIndex].quantity <= 0) {
        updatedCartItems.splice(existingItemIndex, 1);
      }
      setCartItems(updatedCartItems);
    }
  };

  const handleCartButtonClick = () => {
    setShowCartPopup(true);
  };

  const handleClosePopup = () => {
    setShowCartPopup(false);
  };

  return (
    <div className="product-list">
      <BestSellerCard 
        product={bestSeller}
        onClick={() => handleProductClick(bestSeller)} 
        onIncreaseQuantity={() => handleIncreaseQuantity(bestSeller.id, 10)}
        onDecreaseQuantity={() => handleDecreaseQuantity(bestSeller.id, 10)}
      />
      {products.map((product, index) => (
        <ProductCard 
          key={index} 
          product={product}
          onClick={() => handleProductClick(product)} 
          onIncreaseQuantity={() => handleIncreaseQuantity(product.id, 10)}
          onDecreaseQuantity={() => handleDecreaseQuantity(product.id, 10)}
        />
      ))}
      {cartItems.length > 0 && (
        <div className="cart-button-container">
          <CartButton onClick={handleCartButtonClick} />
        </div>
      )}
      {showCartPopup && <CartPopup cartItems={cartItems} onClose={handleClosePopup} />}
    </div>
  );
};

export default ProductList;
