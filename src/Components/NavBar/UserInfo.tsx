import React from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import { DownArrow } from "assets/icons";
import { useSelector } from "react-redux";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {}

/**
 * Renders the user information. Used in User component.
 */
export function UserInfo(props: Props) {
  // Redux state
  const avatarURL = useSelector((state: RootState) => state.user.avatar);

  return (
    <Container className={props.className}>
      <Info>
        <Avatar width="40px" height="40px" url={avatarURL} />
        <UsernameBox>
          <Username>Name</Username>
          <TwitterHandle>Handle</TwitterHandle>
        </UsernameBox>
      </Info>
      <DownArrowSVG />
    </Container>
  );
}

const Container = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
`;

const UsernameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
  display: none;

  @media only screen and (min-width: 1280px) {
    display: flex;
  }
`;

const Username = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const TwitterHandle = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.greyText};
`;

const DownArrowSVG = styled(DownArrow)`
  height: 19px;
  display: none;

  @media only screen and (min-width: 1280px) {
    display: block;
  }
`;
