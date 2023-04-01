type Base = {
    _createdAt: string;
    _id: string;
    _rev: string;
    _type: string;
    _updatedAt: string;
}

interface Product extends Base {
    image: [];
    name: string;
    slug: Slug;
    price: number;
    quantity: number;
    details: string
}

interface Post extends Base {
    author: Authors;
    body: Block[];
    categories: Category[];
    mainImage: Image;
    slug: Slug;
    title: string;
    description: string;
}

interface Authors extends Base {
    bio: Block[];
    image: Image;
    name: string;
    slug: Slug;
}

interface Image {
    _type: 'image';
    assset: Reference;
}

interface Reference {
    _ref:string;
    _type: 'reference';
}

interface Slug {
    _typpe: 'slug';
    current: string;
}

interface Block {
    _key: string;
    _type: 'block';
    children: Span[];
    markDefs: any[];
    style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'blockquote';
}

interface Span {
    _key: string;
    _type: 'span';
    marks: string[];
    text: string;
}

interface Category extends Base {
    title: string;
    description: string;
}