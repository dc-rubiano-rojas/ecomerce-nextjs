'use client';

import React from 'react'
import { useGlobalContext } from '../context/StateContext'


const AddToCartBuyNowButtons = ({ product }: any) => {
    // const cartItems = useSelector(selectCartItems);
    const { onAdd, setShowCart, qty } = useGlobalContext();
    const handleBuyNow = () => {
        onAdd(product, qty);
        setShowCart(true);
    }

    return (
        <div className="buttons">
            <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
        </div>
    )
}

export default AddToCartBuyNowButtons