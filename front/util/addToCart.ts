import axios from "axios";
import Cookies from "js-cookie";

export default async function addToCart(cart: any[], cartid: any, item: any) {
  let newCart = cart;
  let products: any[] = [];

  Cookies.set("cart", JSON.stringify(newCart));

  cart.forEach((item) => {
    products.push(item.product);
  });

  if (newCart.filter((i) => i.product === item.product).length > 0) {
    newCart[products.indexOf(item.product)].count++;
  } else {
    newCart.push(item);
  }
  const req = {
    data: {
      item: newCart,
    },
  };
  const res = await axios.put(`http://localhost:1337/api/carts/${cartid}`, req);
  return res;
}
