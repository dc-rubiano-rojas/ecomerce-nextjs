import React from 'react';
import Link from 'next/link';
import { groq } from 'next-sanity'

import urlFor from '../lib/urlFor';

export const revalidate = 30; // revalidate this page every 60 seconds

const HeroBanner = ({ bannerData }: any) => {

  return (
    <div className="hero-banner-container">
      <div>

        <p className="beats-solo">{bannerData.smallText}</p>
        <h3>{bannerData.midText}</h3>
        <h1>{bannerData.largeText1}</h1>
        {bannerData.image &&
          <img src={urlFor(bannerData.image).url()} alt="headphones" className="hero-banner-image" />
        }

        <div>
          <Link href={`/product/${bannerData.product}`}>
            <button type="button">{bannerData.buttonText}</button>
          </Link>

          <div className="desc">
            <h5>Description</h5>
            <p>{bannerData.desc}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default HeroBanner