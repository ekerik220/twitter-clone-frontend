import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  width?: string;
  height?: string;
}

export function Avatar(props: Props) {
  const avatarURL = useSelector((state: RootState) => state.user.avatar);

  return (
    <Container width={props.width} height={props.height}>
      <Img src={avatarURL} />
    </Container>
  );
}

const Container = styled.div<Props>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img.attrs({ alt: "User's avatar" })`
  width: 100%;
  height: 100%;
`;
