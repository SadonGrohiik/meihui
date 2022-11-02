import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider, Button } from "@mantine/core";
import Layout from "../components/layout";
import "../styles/index.scss";
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";
import AppContext from "../context/AppContext";
import React from "react";
import App from "next/app";

// import withData from "../lib/apollo";

class MyApp extends App {
  state = {
    user: null,
  };
  componentDidMount() {
    //grab token from cookie
    const token = Cookie.get("token");
    if (token) {
      //authenticate the token on the server andp lace setr user object
      fetch(`${process.env.STRAPI_URL}/users/me`, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }).then(async (res: any) => {
        //if res comes back not valid, token is not valid
        //delete the token and log the user out on client
        if (!res.ok) {
          Cookie.remove("token");
          this.setState({ user: null });
          return null;
        }
        const user = await res.json();
        this.setUser(user);
      });
    }
  }
  setUser = (user: any) => {
    this.setState({ user });
  };

  render() {
    const { Component, pageProps } = this.props;
    return (
     
      <AppContext.Provider
        value={{
          user: this.state.user,
          isAuthenticated: !!this.state.user,
          setUser: this.setUser,
        }}
      >
        <Layout>
          <Head>
            <title>
              <meta
                name="viewport"
                content="minimum-scale=1, initiaal-scale=1, width=device-width"
              />
            </title>
          </Head>

          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              fontFamily: "Yekan",
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
                  "#7d798e"
                ],
                marguerite: [
                  "#ada0e2",
                  "#a090dd",
                  "#9280d8",
                  "#8570d3",
                  "#7760ce",
                  "#6b56b9",
                  "#5f4da5",
                  "#534390",
                  "#473a7c",
                  "#3c3067"
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
                  "#674454"
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
                  "#50697a"
                ],
                light: [
                  "#fefaf9",
                  "#fefaf9",
                  "#fefaf9",
                  "#fefaf9",
                  "#fefaf9",
                  "#e5e1e0",
                  "#cbc8c7",
                  "#b2afae",
                  "#989695",
                  "#7f7d7d"
                ],
                dark: [
                  "#bdb5b3",
                  "#7e7978",
                  "#726c6d",
                  "#675f62",
                  "#5b5257",
                  "#4f454c",
                  "#443941",
                  "#392d36",
                  "#2e222a",
                  "#23161f"
                ]
              },
            }}
          >
            <Component {...pageProps} />
          </MantineProvider>
        </Layout>
      </AppContext.Provider>
    );
  }
}

export default MyApp;
