import React from "react";

import { Logo, StyledLink, Wrapper } from "./Navbar.styled";

const Navbar = () => {
  return (
    <Wrapper>
      <Logo to="/">Gram</Logo>
      <StyledLink to="/login">Login</StyledLink>
      <StyledLink to="/register">Register</StyledLink>
      <StyledLink to="/signout">Sign out</StyledLink>
    </Wrapper>
  );
};

export default Navbar;
