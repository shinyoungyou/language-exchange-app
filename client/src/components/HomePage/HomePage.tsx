import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Header,
  Segment,
  Image,
  Divider,
} from "semantic-ui-react";
import { useStore } from "@/stores/store";
import LoginForm from "@/components/auth/login/LoginForm";
import Register from "@/components/auth/register/Register";
import { GoogleLogin } from "@react-oauth/google";

// import { GoogleLogin } from 'react-google-login';

// import * as S from "./HomePage.styles";
import HomeAbout from "@/components/HomePage/AboutPage";

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <>
      <Segment textAlign="center" vertical className="masthead">
        <Container text>
          <Header as="h1" inverted>
            <Image
              size="massive"
              src={require("../../assets/img/logo.png")}
              alt="logo"
              style={{ marginBottom: 12 }}
            />{" "}
            language exchange
            <Header.Subheader>
              Practice any language, anytime, with people from all across the
              globe!
            </Header.Subheader>
          </Header>
          {userStore.isLoggedIn ? (
            <>
              {userStore.user?.gender && userStore.user.native ? (
                <>
                  <Header
                    as="h2"
                    inverted
                    content={`Welcome back ${userStore.user?.displayName}`}
                  />
                  <Button as={Link} to="/connect" size="huge" inverted>
                    Start learning
                  </Button>
                </>
              ) : (
                <>
                  <Header
                    as="h2"
                    inverted
                    content={`Welcome back ${userStore.user?.displayName}`}
                  />
                  <Button
                    onClick={() => modalStore.openModal(<Register />)}
                    size="huge"
                    inverted
                  >
                    Now complete your profile!
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <Button
                onClick={() => modalStore.openModal(<LoginForm />)}
                size="huge"
                inverted
              >
                Login
              </Button>
              <Button
                onClick={() => modalStore.openModal(<Register />)}
                size="huge"
                inverted
              >
                Register
              </Button>
              <Divider horizontal inverted>
                Or
              </Divider>
              <div className="googleLogin">
                <GoogleLogin
                  locale="en-US"
                  onSuccess={(response: any) => {
                    userStore.googleLogin(response.credential);
                    console.log("login success", response);
                  }}
                  onError={() => {
                    console.log("Login failed");
                  }}
                />
              </div>
            </>
          )}
        </Container>
      </Segment>
      <HomeAbout />
    </>
  );
});
