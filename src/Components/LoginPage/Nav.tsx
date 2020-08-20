import React from "react";
import styled from "styled-components";
import { navbarItems } from "./navbarItems";

export function Nav() {
  return (
    <Wrapper aria-label="Footer">
      {navbarItems.map((navbarItem) => (
        <NavLink
          href=""
          target="_blank"
          rel=" noopener noreferrer"
          key={navbarItem.text}
        >
          <span>{navbarItem.text}</span>
        </NavLink>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 10px 15px;
`;

const NavLink = styled.a`
  color: ${({ theme }) => theme.colors.greyText};
  font-size: 13px;
  margin: 5px 0;
  padding-right: 15px;
  text-decoration: none;

  &:hover {
    text-decoration-line: underline;
  }
`;
