import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {Button, } from "@mantine/core";

import AppContext from "../../context/AppContext";

function Cart(){
    const appContext = useContext(AppContext);
    const router = useRouter();

  

}

export default Cart;