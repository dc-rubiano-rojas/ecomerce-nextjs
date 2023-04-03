'use client';

import React, { useEffect } from 'react'
import { AiFillStar, AiOutlineMinus, AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'
import toast, { Toaster } from 'react-hot-toast';

import ImageProductCard from './ImageProductCard'
import Product from './Product'

import { useGlobalContext } from '../context/StateContext'


const ProductDetails = ({ name, details, price, products, image, product }: any) => {
    const { decQty, incQty, qty, onAdd, setShowCart } = useGlobalContext();

    const handleBuyNow = () => {
        onAdd(product, qty);
        setShowCart(true);
    }

    // TODO: ADD TOAST DO NOT WORK
    const handleAddToCart = (product: Product, qt: number) => {
        onAdd(product, qty);
        console.log('ENTRA AL ONADD para el toast');
        
        toast.success('Successfully created!');
    }

    return (
        <div>
            <div className="product-detail-container">
                <ImageProductCard image={image} />

                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>

                    <div className="quantity">
                        <h3>Quantity:</h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={incQty}><AiOutlinePlus /></span>
                        </p>
                    </div>

                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => handleAddToCart(product, qty)}>Add to Cart</button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                    </div>

                </div>
            </div>

            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {products.map((item: any) => (
                            <Product key={item._id} product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails