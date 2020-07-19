import React, { useState } from "react";
import styled from "styled-components";

type CheckBoxProps = {
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

/**
 * Twitter style checkbox
 *
 * Uses a hidden checkbox input over top of a stylized
 * div + SVG combo. Tracks the checkbox state and
 * changes the CSS on the div+SVG accordingly.
 */
export function Checkbox(props: CheckBoxProps) {
  // We need to know if checkbox is checked or not
  // so we can control background/border colors
  const [localChecked, setLocalChecked] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Take care of our local checked state (so we
    // can update our CSS)
    setLocalChecked(e.target.checked);

    // If an onChange handler was specified by someone
    // using this component, also call that.
    if (props.onChange) props.onChange(e);
  };

  return (
    <Container
      checked={props.checked !== undefined ? props.checked : localChecked}
    >
      <CheckMarkBackground
        checked={props.checked !== undefined ? props.checked : localChecked}
      >
        <SVGCheckMark viewBox="0 0 24 24">
          <g>
            <path
              fill="currentColor"
              d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"
            ></path>
          </g>
        </SVGCheckMark>
      </CheckMarkBackground>
      <Input
        type="checkbox"
        checked={props.checked !== undefined ? props.checked : localChecked}
        onChange={onChangeHandler}
      ></Input>
    </Container>
  );
}

type ContainerProps = { checked: boolean };
const Container = styled.div<ContainerProps>`
  position: relative;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme, checked }) =>
      checked ? theme.colors.blueHover : theme.colors.greyHover};
  }
`;

const Input = styled.input`
  -webkit-appearance: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-55%, -55%);
  height: 20px;
  width: 20px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: 1px solid black;
  }
`;

type CheckMarkBackgroundProps = { checked: boolean };
const CheckMarkBackground = styled.div<CheckMarkBackgroundProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 20px;
  width: 20px;
  border: 2px solid;
  border-radius: 4px;
  background-color: ${({ theme, checked }) =>
    checked ? theme.colors.blueMain : "white"};
  border-color: ${({ theme, checked }) =>
    checked ? theme.colors.blueMain : theme.colors.greyBorder};
`;

const SVGCheckMark = styled.svg`
  height: 17px;
  color: white;
`;
