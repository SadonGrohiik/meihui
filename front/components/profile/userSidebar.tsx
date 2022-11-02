import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import AppContext from "../../context/AppContext";

import {
    createStyles,
    Navbar,
    TextInput,
    Code,
    UnstyledButton,
    Badge,
    Text,
    Group,
    ActionIcon,
    Tooltip,
  } from '@mantine/core';

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


const UserSidebar = ()=>{

    const mainLinks = links.map((link) => (
        <UnstyledButton key={link.label} >
          <div>
            <link.icon size={20} stroke={1.5} />
            <span>{link.label}</span>
          </div>
        </UnstyledButton>
      ));
      return (
        <Navbar height={700} width={{ sm: 300 }} p="md" >
          {/* <Navbar.Section >
            <UserButton
              image="https://i.imgur.com/fGxgcDF.png"
              name="Bob Rulebreaker"
              email="Product owner"
              icon={<IconSelector size={14} stroke={1.5} />}
            />
          </Navbar.Section> */}

    
          <Navbar.Section>
            {/* <div>{mainLinks}</div> */}
          </Navbar.Section>
        </Navbar>
      
      );
}