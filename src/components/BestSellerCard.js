import React, { useState } from 'react';
import './BestSellerCard.css';
import { motion } from 'framer-motion';
import Desc from './assets/label2.png';
import Rating from './assets/rating.png';
import Less from './assets/-.png';
import More from './assets/+.png';

const BestSellerCard = ({ product, onClick, onIncreaseQuantity, onDecreaseQuantity }) => {
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
      className={`best-seller-card ${isExpanded ? 'expanded' : ''}`} 
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
          <div className="best-seller-detail-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="best-seller-detail-content">
            <div className='title-desc'>
              <h3 className="best-seller-title">{product.title}</h3>
              <p className="best-seller-full-description">Description du produit en détail.</p>
            </div>
            <div className="best-seller-description-image">
              <img src={Desc} alt="Description image" />
            </div>
            <div className="best-seller-about">
              <h3>À propos</h3>
              <div className='best-seller-desc-product'>
                <p>Description du produit</p>
              </div>
            </div>
            <div className="best-seller-quantity">
              <h3>Quantité</h3>
              <div className='best-seller-wrap-quantity'>
                <div className="best-seller-quantity-selector">
                  <motion.img
                    src={Less}
                    alt="Decrease"
                    onClick={handleDecrease}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="best-seller-quantity-button"
                  />
                  <span>{quantity}</span>
                  <motion.img
                    src={More}
                    alt="Increase"
                    onClick={handleIncrease}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="best-seller-quantity-button"
                  />
                </div>
                <div className="best-seller-quantity-details">
                  <p>Prix total : {product.price * quantity}€</p>
                  <p>Livraison gratuite à partir de 20€.</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="best-seller-info horizontal">
          <img src={product.image} alt={product.title} className="best-seller-image" />
          <div className="best-seller-details">
            <h3 className="best-seller-title">{product.title}</h3>
            <p className="best-seller-description">{product.description}</p>
          </div>
          <img src={Rating} alt="Rating" className='rating'/>
          <div className="best-seller-price">
            <p>à partir de</p>
            <p className="price">{product.price}€</p>
            <p>l'unité</p>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BestSellerCard;
