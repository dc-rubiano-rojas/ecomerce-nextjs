import { groq } from 'next-sanity';

import { client } from '../../../../lib/sanity.client';

import { ProductDetails } from '../../../../components'

type Props = {
    params: {
        slug: string;
    }
}

export const revalidate = 30; // revalidate this page every 60 seconds

export async function generateStaticParams() {
    const query = groq`*[_type == "post"] { slug }`;
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

    return (
        <ProductDetails
            name={name}
            details={details}
            price={price}
            products={products}
            product={product}
            image={image}
        />
    )
}

export default page