import React from "react";

export function DownArrow(props: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={props.className}>
      <g>
        <path
          fill="currentColor"
          d="M20.207 8.147c-.39-.39-1.023-.39-1.414 0L12 14.94 5.207 8.147c-.39-.39-1.023-.39-1.414 0-.39.39-.39 1.023 0 1.414l7.5 7.5c.195.196.45.294.707.294s.512-.098.707-.293l7.5-7.5c.39-.39.39-1.022 0-1.413z"
        ></path>
      </g>
    </svg>
  );
}
