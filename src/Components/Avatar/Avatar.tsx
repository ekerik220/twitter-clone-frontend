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
  url?: string;
}

export function Avatar(props: Props) {
  return (
    <Container width={props.width} height={props.height}>
      <Img
        src={
          props.url ||
          "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
        }
      />
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
  border-radius: 50%;
  overflow: hidden;
`;

const Img = styled.img.attrs({ alt: "User's avatar" })`
  width: 100%;
  height: 100%;
`;
