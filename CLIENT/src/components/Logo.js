import React from "react";
import { Link as LinkR } from "react-router-dom"; //link para o router
import styled from "styled-components";
import logo from "../imgs/logo.jpeg";

export const NavLogo = styled(LinkR)`
  color: #fff;
  justify-content: flex-start;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  margin-left: 0px;
  font-weight: bold;
  text-decoration: none;

  @media screen and (max-width: 450px) {
    transition: 0.8s all ease;
    margin-left: 0px;
  }
`;

const Logo = ({ width, height }) => {
  return (
    <>
      <NavLogo >
        <img
          src={logo}
          alt="Logo"
          width={width}
          height={height}
          className="cursor-pointer"
          to="/"
        />{" "}
      </NavLogo>
    </>
  );
};

export default Logo;
