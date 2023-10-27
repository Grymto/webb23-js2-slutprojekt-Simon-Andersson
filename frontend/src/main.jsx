import React, { useState } from 'react';
import { createRoot } from 'react-dom';
import Basket from './components/Basket';
import Products from './components/Products';

function App() {
  const [basketItems, setBasketItems] = useState([]); 
  const [component, setComponent] = useState(<Products basketItems={basketItems} updateBasketItems={updateBasketItems} />);

  function updateBasketItems(newBasketItems) {
    setBasketItems(newBasketItems);
  }

  function basketComponent() {
    setComponent(<Basket basketItems={basketItems} updateBasketItems={updateBasketItems} productsComponent={productsComponent} />);
  }

  function productsComponent() {
    setComponent(<Products basketItems={basketItems} updateBasketItems={updateBasketItems} />);
  }

  return (
    <div>
      <div className='navbar'>
      <button onClick={productsComponent}>Products</button>
      <button onClick={basketComponent}>Basket {basketItems.length}</button>
      </div>
      {component}
    </div>
  );
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);