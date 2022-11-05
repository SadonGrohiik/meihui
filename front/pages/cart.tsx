import type { NextPage } from "next";
import client from "../apollo-client";
import { Context, gql } from "@apollo/client";
import AppContext from "../context/AppContext";
import React, { useContext } from "react";
import { CartItem } from "../components/cart/cartItem";
import { getUserInfo } from "../util/queries";
import { formatNum } from "../util/util";
import { Card, Grid, Group, createStyles, Button, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  container: {
    maxWidth: 1260,
  },
  sum: {
    direction: "ltr",
  },
  checkoutBtn: {
    fontWeight: 400,
  },
}));
const Cart: NextPage = ({ cart }: any) => {
  const { user, setUser } = useContext<any>(AppContext);
  const { classes } = useStyles();
  console.log(cart[0]);
  const cartList = cart.map((item: any) => (
    <Card.Section key={item.id} withBorder p="xl">
      <CartItem
        name={item.product.Name}
        count={item.count}
        image={item.product.Images[0].formats.thumbnail.url}
        price={formatNum(item.product.Price)}
        color={item.product.color.name}
      />
    </Card.Section>
  ));
  let prices: any[] = [];
  cart.forEach((item: any) => {
    prices.push(parseInt(item.product.Price) * parseInt(item.count));
  });
  const sum = prices.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);
  console.log(sum);
  return (
    <div className={classes.container}>
      <Grid grow px="xl">
        <Grid.Col span={8}>
          <Card p="lg" withBorder radius="md">
            {cartList}
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card withBorder radius="md">
            <Group position="apart" grow>
              <Text fw={500} size="sm">
                مجموع سبد خرید
              </Text>
              <Text size="sm" className={classes.sum}>
                {formatNum(sum)}
              </Text>
            </Group>
            <Button
              className={classes.checkoutBtn}
              mt="xl"
              fullWidth
              color="marguerite"
            >
              ادامه
            </Button>
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export async function getServerSideProps(context: Context) {
  const cookies = await context.req.headers.cookie;
  const token = cookies.split("token=")[1];
  let res = await getUserInfo(token);

  const data = res?.data;
  return {
    props: {
      cart: data.cart.item,
    },
  };
}

export default Cart;
