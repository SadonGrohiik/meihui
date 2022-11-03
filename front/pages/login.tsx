import React, { useState, useContext, useEffect } from "react";

import { login } from "../components/lib/auth";
import Router, { useRouter } from "next/router";
import {
  Container,
  Grid,
  Button,
  Paper,
  Box,
  TextInput,
  Title,
  PasswordInput,
  createStyles,
} from "@mantine/core";
import AppContext from "../context/AppContext";
import { Logo } from "../components/logo";

import Cookies from "js-cookie";

const useStyles = createStyles((theme) => ({
  loginBtn: {
    height: 45,
    fontFamily: "Yekan",
    fontWeight: 400,
    fontSize: 16,
    marginTop: 40,
  },
  title: {
    fontFamily: "Yekan",
    fontWeight: 400,
  },
  container: {
    fontFamily: "Yekan",
  },
}));

function Login(props: any) {
  const { classes } = useStyles();
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push("/"); //redirect if you're logged in
    }
  }, []);

  function onChange(e: any) {
    updateData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <Box sx={{ maxWidth: 400 }} mx="auto">
      <Paper
        className={classes.container}
        withBorder
        px={20}
        pt={20}
        mt={"45%"}
        radius="md"
      >
        <Logo />
        <Title className={classes.title} order={4}>
          {" "}
          ورود | ثبت نام
        </Title>
        <form>
          <TextInput
            onChange={(e) => onChange(e)}
            name="identifier"
            required
            label="ایمیل | نام کاربری"
            placeholder="ایمیل"
            type="email"
            mt="md"
            size="md"
            radius="md"
          />

          <PasswordInput
            onChange={(e) => onChange(e)}
            name="password"
            required
            label="رمز عبور"
            placeholder="رمز عبور"
            mt="md"
            size="md"
            radius="md"
          />
          <Button
            fullWidth
            radius="md"
            color="marguerite"
            my="xl"
            className={classes.loginBtn}
            onClick={() => {
              setLoading(true);
              login(data.identifier, data.password)
                .then((res: any) => {
                  setLoading(false);
                  // set authed User in global context to update header/app state
                  appContext.setUser(res.data.user);
                })
                .catch((error) => {
                  setError(error.response.data);
                  setLoading(false);
                });
            }}
            loading={loading}
            disabled={loading}
            // type="submit"
          >
            {loading ? " " : "ورود"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
export default Login;
