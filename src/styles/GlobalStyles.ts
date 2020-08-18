import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
* {
    box-sizing: border-box;
}

html, body {
    height: 100%;
    margin: 0;
    padding: 0;
    overflow-y: auto;
}

#root {
    min-height: 100%;
    display: flex;
}

body {
    font-family: ${({ theme }) => theme.fontFamily}
}

a {
    text-decoration: none;
    color: rgb(27, 149, 224);
}

a:hover {
    text-decoration: underline;
}


/* Croppie overrides */

.cr-slider-wrap { 
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Add magnifying glass svg icons on either side of the slider */
.cr-slider-wrap::before {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='19' height='19'%3E%3Cg fill='grey'%3E%3Cpath d='M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z'%3E%3C/path%3E%3Cpath d='M14.46 11.75H7.54c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h6.92c.415 0 .75.336.75.75s-.335.75-.75.75z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    margin-right: 3px;
    margin-top: 2px;
}
.cr-slider-wrap::after {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='19' height='19'%3E%3Cg fill='grey'%3E%3Cpath d='M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z'%3E%3C/path%3E%3Cpath d='M15.21 11c0 .41-.34.75-.75.75h-2.71v2.71c0 .41-.34.75-.75.75s-.75-.34-.75-.75v-2.71H7.54c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h2.71V7.54c0-.41.34-.75.75-.75s.75.34.75.75v2.71h2.71c.41 0 .75.34.75.75z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
    margin-left: 3px;
    margin-top: 2px;
}

.cr-slider::-webkit-slider-runnable-track {
    height: 5px;
    background: rgb(142, 208, 249);
}

.cr-slider::-webkit-slider-thumb {
    background: rgb(29, 161, 242);
    transform: scale(1);
    box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 7px, rgba(101, 119, 134, 0.15) 0px 1px 3px 1px;
    transition: all 0.2s;
}

.cr-slider::-webkit-slider-thumb:hover {
    box-shadow: 0px 0px 1px 7px rgba(29,161,242,0.1);
}

.cr-slider::-webkit-slider-thumb:active {
    box-shadow: 0px 0px 1px 5px rgba(29,161,242,0.1);
    transform: scale(1.2);
}

.cr-slider::-moz-range-track {
    height: 5px;
    background: rgb(142, 208, 249);
}

.cr-slider::-moz-range-thumb {
    background: rgb(29, 161, 242);
    transform: scale(1);
    box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 7px, rgba(101, 119, 134, 0.15) 0px 1px 3px 1px;
    transition: all 0.2s;
}

.cr-slider::-moz-range-thumb:hover {
    box-shadow: 0px 0px 1px 7px rgba(29,161,242,0.1);
}

.cr-slider::-moz-range-thumb:active {
    box-shadow: 0px 0px 1px 5px rgba(29,161,242,0.1);
    transform: scale(1.2);
}

.cr-slider::-ms-track {
    height: 5px;
}

.cr-slider::-ms-fill-lower {
	background: rgb(142, 208, 249);
}

.cr-slider::-ms-fill-upper {
	background: rgb(142, 208, 249);
}

.cr-slider::-ms-thumb {
	background: rgb(29, 161, 242);
    transform: scale(1);
    box-shadow: rgba(101, 119, 134, 0.2) 0px 0px 7px, rgba(101, 119, 134, 0.15) 0px 1px 3px 1px;
    transition: all 0.2s;
}

.cr-slider::-ms-thumb:hover {
    box-shadow: 0px 0px 1px 7px rgba(29,161,242,0.1);
}

.cr-slider::-ms-thumb:active {
    box-shadow: 0px 0px 1px 5px rgba(29,161,242,0.1);
    transform: scale(1.2);
}

.cr-slider:focus::-ms-fill-lower {
	background: rgb(142, 208, 249);
}

.cr-slider:focus::-ms-fill-upper {
	background: rgb(142, 208, 249);
}

.croppie-container .cr-viewport,
.croppie-container .cr-resizer {
    position: absolute;
    border: 5px solid rgb(29, 161, 242);
    margin: auto;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    box-shadow: 0 0 2000px 2000px rgba(230, 236, 240, 0.7);
}
`;
