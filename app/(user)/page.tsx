'use client'
import { useEffect, useState } from 'react'
import { groq } from 'next-sanity'

import { client } from '../../lib/sanity.client'

import  { useGlobalContext } from '../../context/StateContext'
import { useFetch } from '../../hooks/useFetch';
import { BestSellerList, HeroBanner, FooterBanner } from '../../components';


const bannerQuery = groq`*[_type == "banner"]`
const productsQuery = groq`*[_type == "product"]`

export const revalidate = 30; // revalidate this page every 60 seconds

export default function Home() {
  // const {         
  //   showCart,
  //   setShowCart,
  //   cartItems,
  //   totalPrice,
  //   totalQuantities,
  //   qty,
  //   incQty,
  //   decQty,
  //   onAdd,
  //   toggleCartItemQuanitity,
  //   onRemove,
  //   setCartItems,
  //   setTotalPrice,
  //   setTotalQuantities  } = useGlobalContext();

  // const { userId, setUserId } = useGlobalContext();
  // useEffect(() => {
  //   setUserId('123123')
  // })

  const [products, setProducts] = useState([]);
  const [bannerData, setbannerData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const products = await client.fetch(productsQuery);
      
      setProducts(products);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const bannerData = await client.fetch(bannerQuery);
      
      setbannerData(bannerData);
    }
    fetchData();
  }, []);

  return (
    <>
      {/* <h1>userId: {userId}</h1> */}

      <HeroBanner bannerData={bannerData.length && bannerData[0]} />

      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>

      <BestSellerList products={products} />


      <FooterBanner footerBanner={bannerData.length && bannerData[0]} />
    </>
  )
}
