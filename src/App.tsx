import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";

import { GlobalStyles, Wrapper } from "./App.styled";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const App = () => {
  return (
    <>
      <GlobalStyles />

      <Wrapper>
        <Navbar />

        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/" component={HomePage} /> // TODO PROTECTED ROUTE
        </Switch>
      </Wrapper>
    </>
  );
};

export default App;
