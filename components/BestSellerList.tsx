import React from 'react'
import Product from './Product';

type Props = {
  // products: Products[]
  products: Product[]
}

const BestSellerList = ({ products }: Props) => {
  return (
    <div className="products-container">
      {products?.map((product, index) => <Product key={product._id} product={product}/>)}
    </div>
  )
}

export default BestSellerList