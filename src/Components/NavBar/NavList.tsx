import React from "react";
import styled, { css } from "styled-components";
import { useLocation, Link } from "react-router-dom";
import {
  HomeIcon,
  ExploreIcon,
  NotificationsIcon,
  MessagesIcon,
  BookmarksIcon,
  ListsIcon,
  ProfileIcon,
  MoreIcon,
} from "assets/icons";
import { gql, useQuery } from "@apollo/client";
import { tweetDetailsFragment } from "utils/fragments";

const GET_HANDLE = gql`
  query {
    self {
      id
      username
      handle
      tweets {
        ...tweetDetails
      }
    }
  }
  ${tweetDetailsFragment}
`;

/**
 * List of navigation buttons in the side nav
 */
export function NavList() {
  // current react router path
  const path = useLocation().pathname;

  // * Query for the logged in user's handle so we can make the profile
  // * button point to their profile page.
  const { data } = useQuery(GET_HANDLE);

  return (
    <>
      <NavItem to="/home" selected={path === "/home"}>
        <NavItemHoverWrap>
          <HomeIcon />
          <NavText>Home</NavText>
        </NavItemHoverWrap>
      </NavItem>
      <NavItem to="/explore" selected={path === "/explore"}>
        <NavItemHoverWrap>
          <ExploreIcon />
          <NavText>Explore</NavText>
        </NavItemHoverWrap>
      </NavItem>
      <NavItem to="/notifications" selected={path === "/notifications"}>
        <NavItemHoverWrap>
          <NotificationsIcon />
          <NavText>Notifications</NavText>
        </NavItemHoverWrap>
      </NavItem>
      <NavItem to="/messages" selected={path === "/messages"}>
        <NavItemHoverWrap>
          <MessagesIcon />
          <NavText>Messages</NavText>
        </NavItemHoverWrap>
      </NavItem>
      <NavItem to="/bookmarks" selected={path === "/bookmarks"}>
        <NavItemHoverWrap>
          <BookmarksIcon />
          <NavText>Bookmarks</NavText>
        </NavItemHoverWrap>
      </NavItem>
      <NavItem to="/lists" selected={path === "/lists"}>
        <NavItemHoverWrap>
          <ListsIcon />
          <NavText>Lists</NavText>
        </NavItemHoverWrap>
      </NavItem>
      <NavItem
        to={{ pathname: `/profile/${data?.self.handle}`, state: data?.self }}
        selected={path.startsWith("/profile")}
      >
        <NavItemHoverWrap>
          <ProfileIcon />
          <NavText>Profile</NavText>
        </NavItemHoverWrap>
      </NavItem>
      {/* <NavItem to="/more" selected={path === "/more"}>
        <NavItemHoverWrap>
          <MoreIcon />
          <NavText>More</NavText>
        </NavItemHoverWrap>
      </NavItem> */}
    </>
  );
}

const NavText = styled.span`
  margin-left: 15px;
  margin-right: 10px;
  font-size: 19px;
  font-weight: bold;
  display: none;

  /* Show text above 1280px, otherwise just icons */
  @media only screen and (min-width: 1280px) {
    display: block;
  }
`;

const NavItemHoverWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 50px;
  transition: background-color 0.2s;
`;

type NavItemProps = { selected: boolean };
const NavItem = styled(Link).attrs({ role: "button" })<NavItemProps>`
  display: flex;
  align-items: center;
  padding: 2px 0;
  color: black;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }

  &:hover > ${NavItemHoverWrap} {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }

  &:hover ${NavText}, &:hover svg {
    color: ${({ theme }) => theme.colors.blueMain};
  }

  ${({ selected }) => selected && selectedStyles};

  @media only screen and (min-width: 1280px) {
    width: 255px;
  }
`;

const selectedStyles = css`
  & > ${NavItemHoverWrap} {
    background-color: ${({ theme }) => theme.colors.blueHover};
  }

  & ${NavText}, & svg {
    color: ${({ theme }) => theme.colors.blueMain};
  }
`;
