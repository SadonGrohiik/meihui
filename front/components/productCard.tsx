import { formatNum, calculateDiscount } from "../util/util";
import { api_url } from "../util/environment";
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
  Paper,
  useMantineTheme,
  Image as Imaj,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Link from "next/link";
import { ClassNames } from "@emotion/react";

const useStyles = createStyles((theme) => ({
  ProductCard: {
    width: 230,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      width: 175,
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
  image: {
    borderRadius: 15,
    overflow: "hidden",
  },
  oldPrice: {
    position: "absolute",
    marginTop: 20,
  },
}));

export function ProductCard(props: any) {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const imgSize = mobile ? 165 : 220;
  return (
    <li>
      <Link href={props.link}>
        <Paper
          className={classes.ProductCard}
          p="xs"
          pb={mobile ? "xs" : "sm"}
          mr={mobile ? "xs" : "md"}
          radius="xs"
        >
          <Imaj
            src={api_url + props.thumbnail}
            alt={props.alt}
            height={imgSize}
            width={imgSize}
            radius="lg"
            fit="cover"
            withPlaceholder
          />
          <Group position="apart" mt="xs" mb="xs">
            <Text weight={400} size={mobile ? "sm" : "md"}>
              {props.name}
            </Text>
          </Group>
          {props.discount && props.discount > 0 && props.stock > 0 ? ( //Checks ford discount
            <Group position="apart" mt="lg">
              <Badge
                color="marguerite"
                variant="filled"
                size={mobile ? "md" : "lg"}
              >
                {props.discount + "%"}
              </Badge>

              <Text weight={400} size={mobile ? "sm" : "md"}>
                <Text
                  weight={400}
                  size="xs"
                  color="grey"
                  className={classes.oldPrice}
                >
                  <s>{formatNum(props.price)}</s>
                </Text>
                {calculateDiscount(props.price, props.discount)}
              </Text>
            </Group>
          ) : (
            <Group position="right" mt="lg">
              <Text
                weight={400}
                size={mobile ? "sm" : "md"}
                color={props.stock > 0 ? "dark" : "dark.2"}
              >
                {props.stock > 0 ? formatNum(props.price) : "ناموجود"}
              </Text>
            </Group>
          )}
        </Paper>
      </Link>
    </li>
  );
}

ProductCard.propTypes = {
  id: PropTypes.number,
  thumbnail: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  discount: PropTypes.number,
  stock: PropTypes.number,
};
