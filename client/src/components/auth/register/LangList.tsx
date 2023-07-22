import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment, Image } from "semantic-ui-react";
import { useStore } from "@/stores/store";
// import LoginForm from '@/components/auth/login/LoginForm';
// import RegsiterForm from '@/components/auth/regsiter/RegsiterForm';

export default observer(function HomePage() {
  const { userStore, modalStore } = useStore();
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>LangList</Container>
    </Segment>
  );
});
