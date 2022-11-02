import type { NextPage } from 'next';
import client from '../apollo-client';
import { Context, gql } from "@apollo/client";
import AppContext from "../context/AppContext";
import React, { useContext } from "react";
import { CartItem } from '../components/cart/cartItem';
import { getUserInfo } from '../util/queries';
import {formatNum} from '../util/util'
import { Card } from '@mantine/core';

const Cart : NextPage = ({cart} : any) => {
    const { user, setUser } = useContext<any>(AppContext);
    
console.log(cart[0])
    const cartList = cart.map((item : any)=>(
   <Card.Section key={item.id} withBorder p="xl">        
   <CartItem 
         name = {item.product.Name} 
         count={item.count}
          image = {item.product.Images[0].formats.thumbnail.url} 
          price={formatNum(item.product.Price)} 
          color={item.product.color} />
          </Card.Section>


    ))
    return(
        <div>
            <Card p="lg" withBorder>
                {cartList}
            </Card>
        </div>
    );

}

export async function getServerSideProps(context: Context) {
    const cookies = await context.req.headers.cookie;
    const token = cookies.split('token=')[1];
    let res = await getUserInfo(token);
  
    const data = res?.data;
    return {
      props: {
        cart: data.cart.item
      },
    };
  }


  export default Cart;