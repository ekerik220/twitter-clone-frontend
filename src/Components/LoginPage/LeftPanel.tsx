import React from "react";
import styled from "styled-components";
import {
  TwitterBird,
  MagnifyingGlassIcon,
  PeopleIcon,
  SpeechBubbleIcon,
} from "assets/icons";

export function LeftPanel() {
  return (
    <Wrapper>
      <TwitterBirdSVG />
      <TextArea>
        <TextItem mb="40px">
          <MagnifyingGlassSVG />
          <Span>Follow your interests.</Span>
        </TextItem>
        <TextItem mb="40px">
          <PeopleSVG />
          <Span>Hear what people are talking about.</Span>
        </TextItem>
        <TextItem>
          <SpeechBubbleSVG />
          <Span>Join the conversation.</Span>
        </TextItem>
      </TextArea>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  align-items: center;
  background: ${({ theme }) => theme.colors.blueSecondary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  position: relative;
  height: 260px;
  padding: 15px;

  @media only screen and (min-width: 800px) {
    width: 50%;
    height: auto;
  }
`;

const TwitterBirdSVG = styled(TwitterBird)`
  color: ${({ theme }) => theme.colors.blueMain};
  height: 160vh;
  max-width: none;
  position: absolute;
  right: -50vh;
  top: -30vh;
`;

const TextArea = styled.div`
  max-width: 380px;
  padding: 15px 0;
  z-index: 1;
`;

type TextItemProps = {
  mb?: string;
};
const TextItem = styled.div<TextItemProps>`
  color: white;
  display: flex;
  margin-bottom: ${(props) => props.mb};
`;

const MagnifyingGlassSVG = styled(MagnifyingGlassIcon)`
  height: 28.75px;
`;

const PeopleSVG = styled(PeopleIcon)`
  height: 28.75px;
`;

const SpeechBubbleSVG = styled(SpeechBubbleIcon)`
  height: 28.75px;
`;

const Span = styled.span`
  align-self: center;
  font-size: 19px;
  font-weight: bold;
  margin-left: 15px;
  line-height: 30px;
`;
