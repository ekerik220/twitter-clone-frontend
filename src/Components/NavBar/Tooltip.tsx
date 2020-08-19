import React from "react";
import styled from "styled-components";
import { Avatar } from "Components/Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { tooltipWasClosed } from "redux/slices/globalUISlice";
import { useQuery, gql } from "@apollo/client";
import { userLoggedOut } from "redux/slices/userSlice";

const USER_INFO = gql`
  query UserInfo {
    self {
      id
      username
      handle
      avatar
    }
  }
`;

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  visible?: boolean;
}

/**
 * Tooltip that appears when clicking on the user button in the side nav
 */
export function Tooltip(props: Props) {
  const dispatch = useDispatch();

  // Redux state
  const tooltipOpen = useSelector(
    (state: RootState) => state.globalUI.tooltipOpen
  );

  const { data } = useQuery(USER_INFO);

  return (
    <>
      {tooltipOpen && (
        <TooltipBackground onClick={() => dispatch(tooltipWasClosed())} />
      )}
      <Wrapper>
        <Container visible={props.visible}>
          <TopBox>
            <Info>
              <Avatar width="40px" height="40px" url={data?.self.avatar} />
              <UsernameBox>
                <Username>{data?.self.username}</Username>
                <TwitterHandle>{data?.self.handle}</TwitterHandle>
              </UsernameBox>
            </Info>
          </TopBox>
          <Link onClick={() => dispatch(userLoggedOut())}>
            Log out @{data?.self.handle}
          </Link>
          <BottomArrow></BottomArrow>
        </Container>
        {props.children}
      </Wrapper>
    </>
  );
}

const TooltipBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 0;
`;

type ContainerProps = { visible?: boolean };
const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 300px;
  color: #000000;
  background-color: #ffffff;
  font-weight: normal;
  font-size: 13px;
  border-radius: 8px;
  z-index: 99999999;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  display: ${({ visible }) => (visible ? "block" : "none")};
  position: fixed;
  bottom: 70px;
`;

const Wrapper = styled.div`
  position: relative;
`;

const BottomArrow = styled.i`
  position: absolute;
  top: 100%;
  left: 12%;
  margin-left: -12px;
  width: 24px;
  height: 12px;
  overflow: hidden;

  &:after {
    content: "";
    position: absolute;
    width: 12px;
    height: 12px;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: #ffffff;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  }

  @media only screen and (min-width: 1280px) {
    left: 50%;
  }
`;

const TopBox = styled.div<Props>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px 20px;
`;

const Info = styled.div`
  display: flex;
`;

const UsernameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

const Username = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const TwitterHandle = styled.span`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.greyText};
`;

const Link = styled.a`
  display: block;
  font-size: 15px;
  padding: 15px;
  color: black;
  border-top: ${({ theme }) => `1px solid ${theme.colors.greyText}`};
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    background-color: ${({ theme }) => theme.colors.blueHover};
  }
`;
