import { formatNum, calculateDiscount } from "../../util/util";
import { api_url } from "../../util/environment";
import PropTypes from "prop-types";
import Image from "next/image";
import {
  createStyles,
  Card,
  Text,
  Badge,
  UnstyledButton,
  Group,
  Image as imgContainer,
  SimpleGrid,
  useMantineTheme,
  
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
  item:{
    width: "100%",
  }
}));
interface CartItemProps{
  image: string,
  name: string,
  price: string,
  count: number,
  color: string,

}

export function CartItem({image, name, price, count, color}: CartItemProps){
const classes = useStyles();
const theme = useMantineTheme();
const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
const imgSize = mobile ? 150 : 250;
  return(
    <Group className= {classes.item}>
       <Image
              src={api_url + image}
              alt="image"
              height={imgSize}
              width={imgSize}
              objectFit="cover"
              quality={30}
            />
<div>
  <Text className={classes.name}>
    {name}
  </Text>
    <Text className={classes.color}>
    {color}
  </Text>
  <Text className={classes.price}>
    {price}
  </Text>
  <Text className={classes.count}>
    {count}
  </Text>

</div>
    </Group>
  )
}