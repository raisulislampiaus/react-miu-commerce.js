import React, { useState, useEffect } from 'react'
import Products from './components/products/Products'
import { commerce } from './commerce/Commerce'
import Navbar from './components/Navbar/Navbar';

function App() {

    const [products, setProducts] = useState([]);

    const [cart, setCart] = useState({});

    
    const fatchProducts = async () =>{
        const { data } = await commerce.products.list();

        setProducts(data);
    }

    const fetchCart = async () => {
        
        setCart(await commerce.cart.retrieve());

    }

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
    
        setCart(item.cart);
      }
    

    useEffect(() =>{
        fatchProducts();
        fetchCart();
        
    }, []);

    console.log(cart);

    
    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            <Products products={products} onAddToCart={ handleAddToCart } />
        </div>
    )
}

export default App
