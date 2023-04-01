'use client'

import { groq } from 'next-sanity';

import { AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar } from 'react-icons/ai';

import { client } from '../../../../lib/sanity.client';
import urlFor from '../../../../lib/urlFor';
// import { useGlobalContext } from '../theme-provider'

import { AddToCartBuyNowButtons, Product, ImageProductCard } from '../../../../components'
// import { useGlobalContext } from '../../../../context/StateContext';
// import { useGlobalContext } from '../../context/StateContext'


type Props = {
    params: {
        slug: string;
    }
}
const query = groq`*[_type == "post"] { slug }`;

export const revalidate = 30; // revalidate this page every 60 seconds

export async function generateStaticParams() {
    const slugs: Post[] = await client.fetch(query);

    const slugRoutes = slugs.map(slug => slug.slug.current);
    return slugRoutes.map((slug) => ({
        slug,
    }));
}

const page = async ({ params: { slug } }: Props) => {
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
    const { image, name, details, price } = product;



    // const { decQty, incQty, qty, onAdd, setShowCart } = useGlobalContext();

    //   const handleBuyNow = () => {
    //     onAdd(product, qty);

    //     setShowCart(true);
    //   }

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

                            {/* <span className="minus" onClick={decQty}><AiOutlineMinus /></span>
                            <span className="num">{qty}</span>
                            <span className="plus" onClick={incQty}><AiOutlinePlus /></span> */}
                        </p>
                    </div>

                    <AddToCartBuyNowButtons />

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

// export const getStaticPaths = async () => {
//   const query = `*[_type == "product"] {
//     slug {
//       current
//     }
//   }
//   `;

//   const products = await client.fetch(query);

//   const paths = products.map((product: any) => ({
//     params: { 
//       slug: product.slug.current
//     }
//   }));

//   return {
//     paths,
//     fallback: 'blocking'
//   }
// }

export default page