import type { NextPage } from "next";
import { ProductCard } from "../../components/productCard";
import { Context, gql } from "@apollo/client";
import client from "../../apollo-client";
import { Q_getProduct, getUserInfo } from "../../util/queries";
import { sortNumbers, uniq } from "../../util/util";
import { useRouter } from "next/router";
import {
  Group,
  Badge,
  createStyles,
  UnstyledButton,
  Button,
  Title,
  Grid,
  Container,
  useMantineTheme,
  Card,
  Text,
} from "@mantine/core";
import { useMediaQuery, useElementSize } from "@mantine/hooks";
import { Carousel } from "@mantine/carousel";
import { IconShoppingCartPlus } from "@tabler/icons";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import AppContext from "../../context/AppContext";
import addToCart from "../../util/addToCart";

const useStyles = createStyles((theme) => ({
  carousel: {
    direction: "ltr",
    borderRadius: "12px",
    maxWidth: 620,
    minWidth: 300,
  },
  carouselImg: {
    borderRadius: "12px",
  },
  container: {
    maxWidth: 1920,
  },
  detailName: {
    lineHeight: 2.5,
    fontFamily: "Yekan",
    fontSize: 14,
  },
  detail: {
    fontFamily: "Yekan",
    fontSize: 14,
  },
  title: {
    fontFamily: "Yekan",
    fontWeight: 400,
    marginBottom: 10,
  },
  midSection: {
    borderTop: `1px solid ${theme.colors.dark[0]}`,
    borderRadius: 0,
  },
  detailsSection: {
    marginTop: 25,
    borderBottom: `1px solid ${theme.colors.dark[0]}`,
    paddingBottom: 20,
  },
  addToCartCard: {
    width: 300,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: "100%",
    },
    backgroundColor: `${theme.colors.gray[1]}`,
    borderColor: theme.colors.light[5],
  },
  cartBtn: {
    fontWeight: 500,
    fontSize: 13,
    height: 40,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      height: 45,
    },
  },
}));

const ProductPage: NextPage = ({ product, productID }: any) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { ref, width, height } = useElementSize();
  const { user, setUser } = useContext(AppContext);
  const router = useRouter();

  Cookies.get("cart") && console.log(JSON.parse(Cookies.get("cart")));
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const token = Cookies.get("token");
  useEffect(() => {
    async function getRes() {
      setLoading(true);
      const res = await getUserInfo(token);
      setData(res?.data);
    }
    try {
      getRes();
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  }, []);

  let cart: any[] = [];
  let cartID = data?.cart.id;
  if (data) {
    data.cart.item.forEach((item: any) => {
      cart.push({ product: item.product.id, count: item.count });
    });
  }
  const index = cart.map((e) => e.product).indexOf(productID);
  let btnDisable: boolean = false;
  if (product.Stock <= 0) {
    btnDisable = true;
  } else if (index > -1) {
    btnDisable = cart[index].count >= product.Stock;
  }
  console.log(index);
  const carousel = (
    <Carousel
      ref={ref}
      className={classes.carousel}
      mx="auto"
      withControls={false}
      withIndicators
      height={mobile ? window.outerWidth - 70 : width + 20}
      loop
    >
      {product &&
        product.Images.data.map((image: any) => (
          <Carousel.Slide key={image.id}>
            <Image
              alt="Hello"
              layout="fill"
              objectFit="cover"
              quality={100}
              src={"http://localhost:1337" + image.attributes.small}
            />
          </Carousel.Slide>
        ))}
    </Carousel>
  );
  const details = (
    <Card radius="sm" mt="xl" className={classes.midSection}>
      <Card.Section>
        <div className={classes.detailsSection}>
          <Title className={classes.title} order={4}>
            ?????????????????
          </Title>
          <div className={classes.detail}>
            <Text
              span
              color="dark.2"
              className={classes.detailName}
              weight={400}
            >
              ?????? :{" "}
            </Text>
            <Text span inherit weight={600}>
              {product.color.name}
            </Text>
          </div>
          {product.Details.map((detail: any) => (
            <div key={detail.id} className={classes.detail}>
              <Text
                span
                color="dark.2"
                className={classes.detailName}
                weight={400}
              >
                {detail.Name} :{" "}
              </Text>
              <Text span inherit weight={600}>
                {detail.Value}
              </Text>
            </div>
          ))}
        </div>
      </Card.Section>
    </Card>
  );
  return (
    <Container className={classes.container}>
      <Grid grow gutter="xl">
        <Grid.Col xs={4}>{carousel}</Grid.Col>
        <Grid.Col xs={7} mr={theme.breakpoints.sm ? 0 : 20}>
          <Title className={classes.title} order={3}>
            {product.Name}
          </Title>
          <Grid grow>
            <Grid.Col xs={4}>{details}</Grid.Col>
            <Grid.Col xs={3}>
              <Card
                className={classes.addToCartCard}
                withBorder
                mt="xl"
                radius="md"
              >
                <Card.Section
                  p="md"
                  pr="lg"
                  className={classes.cartCardSection}
                >
                  <Title className={classes.title} order={4}>
                    ????????
                  </Title>
                </Card.Section>
                <Card.Section
                  p="md"
                  pr="lg"
                  className={classes.cartCardSection}
                >
                  <Button
                    disabled={btnDisable}
                    fullWidth
                    color="marguerite"
                    className={classes.cartBtn}
                    radius="md"
                    loading={isLoading}
                    onClick={() => {
                      user
                        ? addToCart(cart, cartID, {
                            product: productID,
                            count: 1,
                          })
                        : router.push("/login");
                    }}
                  >
                    {isLoading ? " " : " ???????????? ???? ??????"}
                  </Button>
                </Card.Section>
              </Card>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export async function getServerSideProps(context: Context) {
  const query = await context.query;
  const slug = query.slug;

  const res = await getProductBySlug(slug);
  const data = res.data;
  return {
    props: {
      product: data.products.data[0].attributes,
      productID: data.products.data[0].id,
    },
  };
}

async function getProductBySlug(slug: string) {
  const res: any = await client.query({
    query: gql`
      {${Q_getProduct(slug)}}
    `,
  });

  return res;
}

export default ProductPage;
