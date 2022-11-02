import type { NextPage } from "next";
import React, { useContext } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import Cookies from "js-cookie";

import {
    createStyles,
    Group,
    UnstyledButton,
    Card,
    useMantineTheme
  } from '@mantine/core';
  import { useMediaQuery } from "@mantine/hooks";
  import {IconHome, IconBasket, IconHeart, IconQuote, IconAddressBook, IconUser, IconDoorExit} from '@tabler/icons';

  const links = [
    { icon: IconHome, label: 'خانه'},
    { icon: IconBasket, label: 'سفارش ها'},
    { icon: IconHeart, label: 'لیست ها'},
    { icon: IconQuote, label: 'دیدگاه ها'},
    { icon: IconAddressBook, label: 'آدرس ها'},
    { icon: IconUser, label: 'اطلاعات'},
    { icon: IconDoorExit, label: 'خروج'},
  ];
  const useStyles = createStyles((theme) => ({
sidebar:{
    width: 350,
},
section:{
    width: "98%",
    margin: "auto",
},
button:{

},
  }));

const Profile: NextPage = () => {
 const { classes } = useStyles();
  const theme = useMantineTheme();
  const { user, setUser } = useContext<any>(AppContext);
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);
  const router = useRouter();
    const mainLinks = links.map((link) => (
        <Card.Section inheritPadding py={10} key={link.label} withBorder className={classes.section}>
        <UnstyledButton  className={classes.button}>
        <Group spacing="md" >
            <link.icon size={30} stroke={1.5} />
            <span >{link.label}</span>
          </Group>
        </UnstyledButton>
        </Card.Section>
      ));
      const userInfo = (
        <Card.Section inheritPadding py={10}>
          {user?.Name}
        </Card.Section>
      )
      const profile = (
        <Card
        className={classes.sidebar}
        p="md"
        m="md"
        radius="sm"
        withBorder
        py={12}
      >
        {userInfo}
        
          {mainLinks}
        </Card>
      );
    return(
      <>{user? profile : ()=>{router.push("/signup");}}</>
    )
}
export default Profile;