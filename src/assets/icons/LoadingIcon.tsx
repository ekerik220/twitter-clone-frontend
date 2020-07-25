import React from "react";
import styled, { keyframes } from "styled-components";

export function LoadingIcon(props: { className?: string }) {
  return (
    <svg
      height="25px"
      width="25px"
      viewBox="0 0 32 32"
      className={props.className}
    >
      <g>
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{ stroke: "rgb(29, 161, 242)", opacity: "0.2" }}
        ></circle>
      </g>
      <RotatingCircle>
        <circle
          cx="16"
          cy="16"
          fill="none"
          r="14"
          strokeWidth="4"
          style={{
            stroke: "rgb(29, 161, 242)",
            strokeDasharray: "80px",
            strokeDashoffset: "60px",
          }}
        ></circle>
      </RotatingCircle>
    </svg>
  );
}

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const RotatingCircle = styled.g`
  transform-origin: center;
  animation-name: ${rotate};
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  height: 1px;
`;
