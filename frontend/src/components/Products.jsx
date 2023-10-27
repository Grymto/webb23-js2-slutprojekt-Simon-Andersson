import React, { useState, useEffect } from 'react';
import '../css/Product.css';

export default function Products({ basketItems, updateBasketItems }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItems, setAddedItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const basketItemCount = basketItems.length;

  useEffect(() => {
    searchProductsOnBackend();
    setAddedItems(basketItems);
  }, []);

  async function searchProductsOnBackend() {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:3000/products?name=${searchQuery}`);
      const data = await response.json();
      data.sort((a, b) => a.price - b.price);
      setSearchResults(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error searching for products:", error);
      setIsLoading(false);
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    searchProductsOnBackend();
  }

  function addToBasket(product) {
    
    const productIndex = addedItems.findIndex(item => item.name === product.name);
    let tmpAddedItems = [...addedItems];
    console.log(productIndex)
    if (productIndex !== -1) {
      
      tmpAddedItems[productIndex].items++;
    } else {
      
      tmpAddedItems = [...tmpAddedItems, { ...product, items: 1 }];
    }
    tmpAddedItems.sort((a, b) => a.price - b.price);
    setAddedItems(tmpAddedItems);
    updateBasketItems(tmpAddedItems);
    console.log(tmpAddedItems);
  }

  return (
    <div>
      <h1 className="Rubrik">Products</h1>
      <form className="form" onSubmit={handleSearch}>
        <input
          className="input"
          type="text"
          placeholder="Search for products"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="srhBtn" type="submit">
          Search
        </button>
      </form>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-container">
          {searchResults.map((product) => (
            <div key={product.id} className="product">
              <p className="">
                <img className='img' src={product.imageurl} alt={product.name} />
              </p>
              <p>Name: {product.name}</p>
              <p>Price: {product.price + " $ USD"}</p>
              <p>In stock: {product.stock_quantity}</p>
              <p>Added items: {addedItems.find(item => item.name === product.name)?.items || 0}</p>
              {(product.stock_quantity < 1) || ((addedItems.find(item => item.name === product.name)?.items || 0) == product.stock_quantity) ? (
        <button className="disabledBtn">Out of stock</button>
      ) : (
        <button className="kopBtn" onClick={() => addToBasket(product)}>Add</button>
      )};
            </div>
          ))}
        </div>
      )}
    </div>
  );
}