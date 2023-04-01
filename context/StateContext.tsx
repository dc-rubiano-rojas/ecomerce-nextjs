"use client"
import { toast } from 'react-hot-toast';


import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

interface ContextProps {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
  toggleCartItemQuanitity: (id: string, value: 'inc' | 'dec') => void;
  onRemove: (product: Product) => void;
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setTotalQuantities: React.Dispatch<React.SetStateAction<number>>;
}

export const ThemeContext = createContext<ContextProps>({
  showCart: false,
  setShowCart: () => { },
  cartItems: [],
  totalPrice: 0,
  totalQuantities: 0,
  qty: 1,
  incQty: () => { },
  decQty: () => { },
  onAdd: () => { },
  toggleCartItemQuanitity: () => { },
  onRemove: () => { },
  setCartItems: () => { },
  setTotalPrice: () => { },
  setTotalQuantities: () => { }
});

export const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {

  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: Product | undefined;
  let index: number | undefined;

  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find((item) => item._id === product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
        return cartProduct;
      })

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`);
  }

  const onRemove = (product: { _id: string }) => {
    let foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct!.price * foundProduct!.quantity);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct!.quantity);
    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity = (id: string, value: 'inc' | 'dec') => {
    let foundProduct = cartItems.find((item) => item._id === id);
    let index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === 'inc') {
      setCartItems([...newCartItems, { ...foundProduct!, quantity: foundProduct!.quantity + 1 }]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct!.price);
      setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
    } else if (value === 'dec') {
      if (foundProduct!.quantity > 1) {
        setCartItems([...newCartItems, { ...foundProduct!, quantity: foundProduct!.quantity - 1 }]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct!.price);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  }

  return (
    <ThemeContext.Provider value={{
      showCart,
      setShowCart,
      cartItems,
      totalPrice,
      totalQuantities,
      qty,
      incQty,
      decQty,
      onAdd,
      toggleCartItemQuanitity,
      onRemove,
      setCartItems,
      setTotalPrice,
      setTotalQuantities
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useGlobalContext = () => useContext(ThemeContext);