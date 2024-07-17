import React from 'react';
import './CartButton.css';

const CartButton = ({ onClick }) => {
  return (
    <button className="cart-button" onClick={onClick}>
      Voir panier
    </button>
  );
};

export default CartButton;
