import React, { useState } from 'react';
import './ProductCard.css';
import { motion } from 'framer-motion';
import Desc from './assets/label.png';
import Less from './assets/-.png';
import More from './assets/+.png';

const ProductCard = ({ product, onClick, onIncreaseQuantity, onDecreaseQuantity }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const handleCardClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      onClick(product);
    }
  };

  const handleCloseClick = (event) => {
    event.stopPropagation();
    setIsExpanded(false);
  };

  const handleIncrease = (event) => {
    event.stopPropagation();
    setQuantity(quantity + 10);
    onIncreaseQuantity();
  };

  const handleDecrease = (event) => {
    event.stopPropagation();
    if (quantity > 0) {
      setQuantity(quantity - 10);
      onDecreaseQuantity();
    }
  };

  return (
    <motion.div 
      className={`product-card ${isExpanded ? 'expanded' : ''}`} 
      onClick={handleCardClick}
      layout
      transition={{ layout: { duration: 0.5, type: "spring" } }}
    >
      {isExpanded ? (
        <>
          <motion.button
            className="close-button"
            onClick={handleCloseClick}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ✕
          </motion.button>
          <div className="product-detail-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="product-detail-content">
            <h3 className="product-title">{product.title}</h3>
            <p className="product-full-description">Description du produit en détail.</p>
            <div className="product-description-image">
              <img src={Desc} alt="Description image" />
            </div>
            <div className="product-about">
              <h3>À propos</h3>
              <div className='desc-product'>
                <p>Description du produit</p>
              </div>
            </div>
            <div className="product-quantity">
              <h3>Quantité</h3>
              <div className='wrap-quantity'>
                <div className="quantity-selector">
                  <motion.img
                    src={Less}
                    alt="Decrease"
                    onClick={handleDecrease}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="quantity-button"
                  />
                  <span>{quantity}</span>
                  <motion.img
                    src={More}
                    alt="Increase"
                    onClick={handleIncrease}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="quantity-button"
                  />
                </div>
                <div className="quantity-details">
                  <p>Prix total : {product.price * quantity}€</p>
                  <p>Livraison gratuite à partir de 20€.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="product-info-horizontal">
          <div className="left">
            <img src={product.image} alt={product.title} className="product-image" />
            <div className="product-details">
              <h3 className="product-title">{product.title}</h3>
              <p className="product-description">{product.description}</p>
            </div>
          </div>
          <div className="product-price">
            <p className='partir'>à partir de</p>
            <p className="price">{product.price}€</p>
            <p className='unite'>l'unité</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;
