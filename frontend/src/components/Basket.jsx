import React, { useState, useEffect } from 'react';
import '../css/Product.css';

export default function Basket({basketItems, updateBasketItems, productsComponent}) {
  const [isThankful, setIsThankful] = useState(false);
  console.log('Basket: basketItems:', basketItems);

  const totalPrice = basketItems.reduce((total, item) => total + item.price * item.items, 0);
  
  async function updateInventory(){
    url = "http://localhost:3000/products"

    const header = {
        "Content-type": "application/json; charset=UTF-8"
    }
    
    const options = {
      method: "POST", 
      body: JSON.stringify(basketItems), 
      headers: header 
    };
  
      const response = await fetch(url,options);
      const msg = await response.json();
      console.log(msg);

  }

  async function buyProducts() {
    updateInventory();
    updateBasketItems([]);
    setIsThankful(true);
  }

  async function emptyBasket() {
    updateBasketItems([]);
    productsComponent();
  }

  return (
    <div>
{isThankful ? (
        <p className='after-sales'>tack för köpet...</p>
      ) : (
        <div>
        <h1 className="title">Basket</h1>
      <div className="basket-container">
        {basketItems.map((product, index) => (
          <div key={index} className="basket">
              <p>
              <img className='img' src={product.imageurl} alt={product.name} />
            </p>
            <p>Name: {product.name}</p>
            <p>Quantity: {product.items}</p> 
            <p>Price: {product.price} $ USD</p> 
          </div>
        ))}
      </div>
      <div className="button-container">
      <button className="buy-button" onClick={buyProducts}>Buy</button>
      <button className="buy-button" onClick={emptyBasket}>Empty</button>
      <div className='total-price'>
        Total Price: {totalPrice} $ USD
      </div>
      </div>
    </div>
    )}
    </div>
  );
}