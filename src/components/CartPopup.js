import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './CartPopup.css';
import CloseIcon from './assets/close.png';
import ArrowIcon from './assets/arrow.png';
import BitcoinIcon from './assets/bitcoin.png';
import WalletIcon from './assets/wallet.png';

const CartPopup = ({ cartItems, onClose }) => {
  const [variant, setVariant] = useState('default');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryAddress1, setDeliveryAddress1] = useState('');
  const [deliveryAddress2, setDeliveryAddress2] = useState('');
  const [deliveryAddress3, setDeliveryAddress3] = useState('');
  const [error, setError] = useState('');
  const [telegramUserId, setTelegramUserId] = useState('');

  const TELEGRAM_BOT_TOKEN = '7365125499:AAGjFMfR1rLY3FUUZak0Ups5VcwUAXYMiLE';
  const TELEGRAM_CHAT_ID = '1911207348';

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    const container = document.querySelector('.cart-popup');
    if (container) {
      container.classList.remove('default-height', 'payment-height', 'address-height');
      switch (variant) {
        case 'payment':
          container.classList.add('payment-height');
          break;
        case 'address':
          container.classList.add('address-height');
          break;
        default:
          container.classList.add('default-height');
          break;
      }
    }

    // Récupérer l'identifiant Telegram de l'utilisateur
    if (window.Telegram && window.Telegram.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user && user.id) {
        setTelegramUserId(user.id);
      } else {
        console.error('Identifiant Telegram de l\'utilisateur non récupéré.');
      }
    } else {
      console.error('Telegram WebApp SDK not loaded.');
    }
  }, [variant]);

  // Fonction pour envoyer la commande à votre bot
  async function sendOrderToBot() {
    const orderDetails = cartItems.map(item => `- ${item.title}: ${item.quantity}g | ${item.price}€`).join('\n');
    const message = `📦 Nouvelle commande de @${telegramUserId}:\n\n${orderDetails}\n\nTotal: ${totalAmount}€\n\n📍 Adresse de livraison :\n${deliveryAddress1}\n${deliveryAddress2}\n${deliveryAddress3}\n \n💶 Méthode de paiement : ${paymentMethod}`;

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}`;

    try {
      await fetch(url, { method: 'GET' });
      alert('Votre commande a été envoyée avec succès.');
      window.Telegram.WebApp.close();
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la commande :', error);
    }
  }

  const handleCheckout = () => {
    if (variant === 'default') {
      if (!paymentMethod || !deliveryAddress1 || !deliveryAddress2 || !deliveryAddress3) {
        setError('Veuillez remplir les éléments nécessaires.');
      } else {
        sendOrderToBot();
      }
    } else {
      setVariant('default');
    }
  };

  const handleVariantChange = (newVariant) => {
    setVariant(newVariant);
    setError('');
  };

  const handlePaymentSelection = (method) => {
    setPaymentMethod(method);
  };

  return (
    <motion.div
      className="cart-popup-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="cart-popup"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {variant === 'default' && (
          <button className="close-button-card" onClick={onClose}>
            <img src={CloseIcon} alt="Close" />
          </button>
        )}
        {variant === 'default' && (
          <motion.div
            key="default"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="popup-header">
              <h2>Commander</h2>
            </div>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <p className="item-price">{item.price * item.quantity}€</p>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <div className="summary-item">
                <p className='liv'>Livraison</p>
                <p className='offer'>Offerte</p>
              </div>
              <div className="summary-total">
                <h3 className='total'>Total</h3>
                <h3 className='amount'>{totalAmount}€</h3>
              </div>
            </div>
            <div className="payment-delivery">
              <div className="payment-method" onClick={() => handleVariantChange('payment')}>
                <p className='payement-text'>Méthode de paiement</p>
                <img src={ArrowIcon} alt="Arrow" className="arrow-icon1" />
              </div>
              <div className="delivery-address" onClick={() => handleVariantChange('address')}>
                <p className='adress-text'>Adresse de livraison</p>
                <img src={ArrowIcon} alt="Arrow" className="arrow-icon2" />
              </div>
            </div>
            {error && <p className="error">{error}</p>}
          </motion.div>
        )}
        {variant === 'payment' && (
          <div key="payment">
            <div className="popup-header">
              <h3>Choisir la méthode de paiement</h3>
            </div>
            <div className="payment-options">
              <button 
                onClick={() => handlePaymentSelection('Espèces')} 
                className={`button2 ${paymentMethod === 'Espèces' ? 'selected' : ''}`}
              >
                Espèces
                <img src={WalletIcon} alt="Wallet" className='wallet-icon' />
              </button>
              <button 
                onClick={() => handlePaymentSelection('Crypto')} 
                className={`button1 ${paymentMethod === 'Crypto' ? 'selected' : ''}`}
              >
                Crypto
                <img src={BitcoinIcon} alt="Bitcoin" className='bitcoin-icon' />
              </button>
            </div>
          </div>
        )}
        {variant === 'address' && (
          <div key="address">
            <div className="popup-header">
              <h2>Ajouter une adresse de livraison</h2>
            </div>
            <div className="address-input">
              <input
                type="text"
                placeholder="N° Rue"
                value={deliveryAddress1}
                onChange={(e) => setDeliveryAddress1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Rue"
                value={deliveryAddress2}
                onChange={(e) => setDeliveryAddress2(e.target.value)}
              />
              <input
                type="text"
                placeholder="Ville"
                value={deliveryAddress3}
                onChange={(e) => setDeliveryAddress3(e.target.value)}
              />
            </div>
          </div>
        )}
        <button className="checkout-button" onClick={handleCheckout}>
          {variant === 'default' ? 'Passer la commande' : 'Valider'}
        </button>
      </motion.div>
    </motion.div>
  );
};

export default CartPopup;
