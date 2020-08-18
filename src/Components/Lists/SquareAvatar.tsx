import React from "react";
import styled from "styled-components";
import { ListAvatarIcon } from "assets/icons";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  width?: string;
  height?: string;
  url?: string;
  className?: string;
}

export function SquareAvatar(props: Props) {
  return (
    <Container
      className={props.className}
      width={props.width}
      height={props.height}
    >
      {props.url ? <Img src={props.url} /> : <ListAvatarIcon />}
    </Container>
  );
}

type ContainerProps = { width?: string; height?: string };
const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 15px;
  overflow: hidden;
  border: 1px solid white;
  background-color: ${({ theme }) => theme.colors.greyBackground};
  color: ${({ theme }) => theme.colors.greyText};
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
`;

const Img = styled.img.attrs({ alt: "User's avatar" })`
  width: 100%;
  height: 100%;
`;
