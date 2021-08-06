import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Header from "./components/Header";
import Content from "./components/Content";
import CartMinus from "./components/CartMinus";

const App = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [cart, setCart] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);

  const deliveryFees = 2.5;
  let subTotal = 0;
  cart.forEach((cartItem) => {
    subTotal += cartItem.price * cartItem.quantity;
  });

  const total = subTotal + deliveryFees;

  const addItem = (item) => {
    const newCart = [...cart];

    const exist = newCart.find((elem) => elem.id === item.id);

    console.log("Le produit existe déjà, le voici : ", exist);

    if (exist) {
      exist.quantity++;
      setCart(newCart);
    } else {
      newCart.push({ ...item, quantity: 1 });

      setCart(newCart);
    }
  };

  const removeItem = (item) => {
    const newCart = [...cart];
    const exist = newCart.find((elem) => elem.id === item.id);
    if (exist.quantity === 1) {
      const index = newCart.indexOf(exist);

      newCart.splice(index, 1);
      if (newCart.length === 0) {
        setCartVisible(false);
      }
    } else {
      exist.quantity--;
    }
    setCart(newCart);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://lereacteur-deliveroo-api.herokuapp.com"
      );

      setData(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div>
      <Header restaurant={data.restaurant} />
      <Content
        menu={data.categories}
        cart={cart}
        addItem={addItem}
        removeItem={removeItem}
        total={total}
        subTotal={subTotal}
        deliveryFees={deliveryFees}
        setCartVisible={setCartVisible}
      />
      <CartMinus
        cart={cart}
        addItem={addItem}
        removeItem={removeItem}
        total={total}
        subTotal={subTotal}
        deliveryFees={deliveryFees}
        cartVisible={cartVisible}
        setCartVisible={setCartVisible}
      />
    </div>
  );
};

export default App;
