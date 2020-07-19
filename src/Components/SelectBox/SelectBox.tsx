import React from "react";
import styled from "styled-components";
import { DownArrow } from "assets/icons";

type PropTypes = {
  title?: string;
  options?: string[];
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
};

export const SelectBox = React.forwardRef<HTMLSelectElement, PropTypes>(
  (props, ref) => {
    return (
      <Wrapper className={props.className}>
        <label>
          <Title>{props.title}</Title>
          <Select value={props.value} onChange={props.onChange} ref={ref}>
            <option selected disabled></option>
            {props.options &&
              props.options.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
          </Select>
          <DownArrowSVG />
        </label>
      </Wrapper>
    );
  }
);

const Title = styled.span`
  color: ${({ theme }) => theme.colors.greyText};
  margin-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DownArrowSVG = styled(DownArrow)`
  width: 22px;
  position: absolute;
  top: 50%;
  right: 8px;
  user-select: none;
  pointer-events: none;
`;

const Select = styled.select`
  display: block;
  border: none;
  width: 100%;
  outline-style: none;
  background-color: ${({ theme }) => theme.colors.greyBackground};
  padding-top: 2px;
  padding-bottom: 5px;
  padding-right: 28px;
  padding-left: 7px;
  font-size: 19px;
  font-family: ${({ theme }) => theme.inputFont};
  line-height: 1.3;
  -moz-appearance: none; /* Firefox */
  -webkit-appearance: none; /* Safari and Chrome */
  appearance: none;
  cursor: pointer;
  border-bottom: 2px solid black;
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.greyBackground};
  padding-top: 5px;
  font-size: 15px;

  &:focus-within {
    ${Select} {
      border-color: ${({ theme }) => theme.colors.blueMain};
    }

    ${Title} {
      color: ${({ theme }) => theme.colors.blueMain};
    }

    ${DownArrowSVG} {
      color: ${({ theme }) => theme.colors.blueMain};
    }
  }
`;
