"use client"

import React, { useState } from 'react';
import urlFor from '../lib/urlFor'


const ImageProductCard = ({ image }: any) => {
    const [index, setIndex] = useState(0);

    return (
        <div>
            <div className="image-container">
                <img src={urlFor(image && image[index]).url()} className="product-detail-image" />
            </div>
            <div className="small-images-container">
                {image?.map((item: any, i: number) => (
                    <img
                        key={i}
                        src={urlFor(item).url()}
                        className={i === index ? 'small-image selected-image' : 'small-image'}
                        onMouseEnter={() => setIndex(i)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ImageProductCard