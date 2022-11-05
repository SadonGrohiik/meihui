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
import { color } from "../util/util";
import Router from "next/router";
import NProgress from "nprogress";
import "../styles/components/nprogress.scss";
// import withData from "../lib/apollo";
Router.events.on("routeChangeStart", () => NProgress.start());

Router.events.on("routeChangeComplete", () => NProgress.done());

Router.events.on("routeChangeError", () => NProgress.done());
NProgress.configure({ showSpinner: false });

class MyApp extends App {
  state = {
    user: null,
  };
  componentDidMount() {
    //grab token from cookie
    const token = Cookie.get("token");
    if (token) {
      //authenticate the token on the server andp lace setr user object
      fetch(`${process.env.STRAPI_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
              colors: color,
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
