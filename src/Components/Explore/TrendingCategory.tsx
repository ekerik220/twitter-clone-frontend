import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { updatedSearchTerm } from "redux/slices/exploreSlice";
import { useHistory } from "react-router-dom";

type PropTypes = { number: number; hashtag: string; numOfTweets: number };

export function TrendingCategory(props: PropTypes) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(updatedSearchTerm(props.hashtag));
    if (history.location.pathname !== "/explore") history.push("/explore");
  };

  return (
    <Container onClick={handleClick}>
      <GreyText>{props.number} · Trending</GreyText>
      <Hashtag>{props.hashtag}</Hashtag>
      <GreyText>
        {props.numOfTweets} {props.numOfTweets > 1 ? "Twats" : "Twat"}
      </GreyText>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyBorder};
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.greyHover};
  }
`;

const GreyText = styled.span`
  color: ${({ theme }) => theme.colors.greyText};
  font-size: 14px;
`;

const Hashtag = styled.span`
  font-weight: bold;
  font-size: 15px;
  margin: 5px 0;
`;
