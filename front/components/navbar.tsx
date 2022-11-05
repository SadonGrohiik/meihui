import {
  createStyles,
  Menu,
  TextInput,
  Header,
  Container,
  Anchor,
  Group,
  Burger,
  Button,
  Grid,
  MantineProvider,
  useMantineTheme,
  Divider,
  UnstyledButton,
  Text,
  Paper,
  Drawer,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Image from "next/image";
import {
  IconChevronDown,
  IconUser,
  IconBasket,
  IconSearch,
  IconDoorEnter,
  IconDoorExit,
  IconHome,
  IconPlus,
  IconMenu,
  IconMenu2,
} from "@tabler/icons";
import useFetch from "../util/useFetch";
import Link from "next/link";
import { MenuItem } from "@mantine/core/lib/Menu/MenuItem/MenuItem";
import { ThemeContext } from "styled-components";
import { Logo } from "./logo";
import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { logout } from "./lib/auth";
import Cookies from "js-cookie";

const header_height: number = 80;
const colors = {
  prelude: [
    "#e3dff4",
    "#dfd9f2",
    "#dad4f1",
    "#d6ceef",
    "#d1c9ed",
    "#bcb5d5",
    "#bcb5d5",
    "#a7a1be",
    "#928da6",
    "#7d798e",
  ],

  wine: [
    "#3e2832",
    "#523643",
    "#d89fb9",
    "#d393b0",
    "#ce87a7",
    "#b97a96",
    "#a56c86",
    "#905f75",
    "#7c5164",
    "#674454",
  ],
  babyBlue: [
    "#c6e4f8",
    "#bde0f7",
    "#b3dbf5",
    "#aad7f4",
    "#a0d2f3",
    "#90bddb",
    "#80a8c2",
    "#7093aa",
    "#607e92",
    "#50697a",
  ],
  neutral: [
    "#fefaf9",
    "#fefaf9",
    "#fefaf9",
    "#fefaf9",
    "#fefaf9",
    "#e5e1e0",
    "#cbc8c7",
    "#b2afae",
    "#989695",
    "#7f7d7d",
  ],
};
const useStyles = createStyles((theme) => ({
  inner: {
    height: header_height,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxWidth: "1920px",
  },
  burger: {
    [theme.fn.largerThan("sm")]: {
      display: `none`,
    },
  },
  mobileLink: {
    display: "block",
    fontFamily: "Yekan",
    fontWeight: 400,
    fontSize: 18,
    color: theme.colors.dark[3],
    paddingBottom: 25,
    direction: "rtl",
    a: {},
  },
  menuLabel: {
    fontFamily: "Yekan",
    fontSize: 18,
    fontWeight: 400,
  },
  links: {
    marginLeft: -theme.spacing.sm,

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  mainLink: {
    textTransform: "uppercase",
    fontSize: 15,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[4]
        : theme.colors.dark[2],
    padding: `7px ${theme.spacing.sm}px`,
    fontWeight: 400,
    borderBottom: "2px solid transparent",
    transition: "border-color 100ms ease, color 100ms ease",
    fontFamily: "Yekan",

    "&:hover": {
      color: theme.colorScheme === "dark" ? theme.white : colors.wine[1],
      textDecoration: "none",
      borderBottom: `2px solid`,
      borderColor: colors.prelude[5],
    },
  },

  linkLabel: {
    marginRight: 5,
    color: theme.colors.dark[2],
    fontWeight: 400,
    fontSize: theme.fontSizes.md,

    "&:hover": {
      color: theme.colors.dark[6],
    },
  },
  iconBtn: {
    [theme.fn.largerThan("sm")]: {
      padding: 6,
    },

    fontFamily: "Yekan",
    fontWeight: 400,
    "&:hover": {
      backgroundColor: "rgba(0,0,0,0)",
    },
  },
  searchBar: {
    textAlign: "right",
    flexGrow: 1,
    maxWidth: 520,
    "&:focus": {
      borderColor: colors.prelude[4],
    },
    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },
  rightHeader: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  leftHeader: {
    flexGrow: 1,
    marginRight: 50,
  },
  logo: {
    marginBottom: 4,
  },
  user: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  mobileMenu: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
    zIndex: 5,
    position: "fixed",
    width: "100%",
    bottom: 0,
    borderTop: `solid 1px ${theme.colors.gray[3]}`,
    borderRadius: 0,
  },
  header: { paddingLeft: 0 },
}));

interface Category {
  id: number;
  attributes: {
    Name: string;
    primary: boolean;
    slug: string;
  };
}

const Navbar = () => {
  const { user, setUser } = useContext(AppContext);
  const theme = useMantineTheme();
  const button_color = theme.colors.prelude;
  const { classes } = useStyles();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const [opened, setOpened]: any = useState();
  const { loading, error, data } = useFetch(
    "http://localhost:1337/api/categories"
  );

  if (loading) return <p>Loadig...</p>;
  if (error) return <p>Error!</p>;
  const categories = data.data;
  const mainLinks = categories.map((category: any) => {
    if (category.attributes.primary) {
      return (
        <li key={category.id}>
          <Link href={`/product-list/${category.attributes.slug}/`}>
            <a className={classes.mainLink}>{category.attributes.Name}</a>
          </Link>
        </li>
      );
    }
  });
  const mobileLinks = categories.map((category: any) => {
    if (category.attributes.primary) {
      return (
        <UnstyledButton
          key={category.id}
          onClick={() => {
            setOpened(false);
          }}
          className={classes.mobileLink}
        >
          <Link href={`/product-list/${category.attributes.slug}/`}>
            <a>{category.attributes.Name}</a>
          </Link>
        </UnstyledButton>
      );
    }
  });
  const searchBar = (
    <TextInput
      className={classes.searchBar}
      placeholder="جستجو"
      variant="filled"
      rightSection={<IconSearch color="grey" size="20px" />}
      radius="md"
    />
  );
  const logo = (
    <Link href="/">
      <Logo className={classes.logo} />
    </Link>
  );

  const accountMenu = (
    <Menu width={200}>
      <Menu.Target>
        <Button className={classes.iconBtn} variant="subtle" color="dark">
          <IconUser size="28px" strokeWidth="1.7" />
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{user?.Name}</Menu.Label>
        <Menu.Item icon={<IconDoorExit size={30} />}>
          <UnstyledButton
            className={classes.navLink}
            onClick={() => {
              logout();
              setUser(null);
            }}
          >
            <Link href="/">خروج</Link>
          </UnstyledButton>
        </Menu.Item>
        <Link href="/profile">
          <Menu.Item icon={<IconUser size={30} />}>
            <Text size="lg" className={classes.menuLabel}>
              پروفایل
            </Text>
          </Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  );
  const cartBtn = (
    <Link href="/cart">
      <Button
        className={classes.iconBtn}
        variant="subtle"
        color={mobile ? "gray" : "dark"}
      >
        &nbsp;&nbsp;
        <IconBasket
          size={mobile ? "32px" : "28px"}
          strokeWidth={mobile ? "2" : "1.6"}
        />
      </Button>
    </Link>
  );
  const icons = (
    <>
      {user ? (
        <>{accountMenu}</>
      ) : (
        <Link href="/login">
          <Button
            className={classes.iconBtn}
            variant="outline"
            color="dark"
            p={6}
            px={10}
            ml="sm"
            radius="md"
          >
            <IconDoorEnter size="28px" strokeWidth="1.7" /> &nbsp;&nbsp;ورود |
            ثبت نام &nbsp;
          </Button>
        </Link>
      )}{" "}
      <Divider size="sm" orientation="vertical" />
      {cartBtn}
    </>
  );

  const mobileBtnProps = {
    variant: "subtle",
    color: "gray",
    px: "xs",
  };
  const mobileMenu = (
    <Paper className={classes.mobileMenu}>
      <Group position="apart" grow p="lg" spacing="xs">
        <Link href="/">
          <Button
            className={classes.mobileBtn}
            variant={mobileBtnProps.variant}
            color={mobileBtnProps.color}
            px={mobileBtnProps.px}
          >
            <IconHome size="32px" strokeWidth="2" />
            {/* change this */}
          </Button>
        </Link>
        <Button
          className={classes.mobileBtn}
          variant={mobileBtnProps.variant}
          color={mobileBtnProps.color}
          px={mobileBtnProps.px}
          onClick={() => setOpened(true)}
        >
          <IconMenu2 size="32px" strokeWidth="2" />
        </Button>

        {cartBtn}
        <Link href={user ? "/profile" : "/login"}>
          <Button
            className={classes.mobileBtn}
            variant={mobileBtnProps.variant}
            color={mobileBtnProps.color}
            px={mobileBtnProps.px}
          >
            <IconUser size="32px" strokeWidth="2" />
          </Button>
        </Link>
      </Group>
    </Paper>
  );
  return (
    <MantineProvider
      theme={{
        colors: {
          prelude: [
            "#e3dff4",
            "#dfd9f2",
            "#dad4f1",
            "#d6ceef",
            "#d1c9ed",
            "#bcb5d5",
            "#bcb5d5",
            "#a7a1be",
            "#928da6",
            "#7d798e",
          ],
        },
      }}
    >
      <Header height={header_height} mb={40} px="xs" className={classes.header}>
        <Container className={classes.inner}>
          <Group position="apart" spacing="md">
            <Group className={classes.rightHeader} position="left" spacing="xl">
              {logo}
              <div className={classes.links}>{mainLinks}</div>
            </Group>
          </Group>

          <Group className={classes.leftHeader} position="left">
            {searchBar}
            <Group
              position="right"
              spacing="xs"
              p={"xs"}
              className={classes.user}
            >
              {icons}
            </Group>
          </Group>
        </Container>
      </Header>
      <Drawer
        className={classes.mobileContents}
        opened={opened}
        onClose={() => setOpened(false)}
        title="دسته بندی"
        padding="xl"
        size="xl"
        position="right"
      >
        <div>{mobileLinks}</div>
      </Drawer>
      {mobileMenu}
    </MantineProvider>
  );
};

function checkPrimary(category: Category) {
  if (category.attributes.primary)
    return (
      <li key={category.id}>
        <Link href={`/product-list/${category.attributes.slug}`}>
          {category.attributes.Name}
        </Link>
      </li>
    );
}

export default Navbar;
