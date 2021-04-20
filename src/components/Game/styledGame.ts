import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: flex;
`

export const GameWrapper = styled.div`
  background-color: var(--darker-blue);
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  padding: 1rem;
  width: 100%;
`

export const GameGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 1rem;
  row-gap: 1rem;
`

export const GameButton = styled.button(() => [
  `
    background-color: var(--transparent);
    position: relative;
    border: 0;
    outline: none;
    padding: 0;
    cursor: pointer;
    text-shadow: rgb(0 0 0 / 10%) 0px 3px 2px;
    transition-duration: 300ms;
    transition-property: background, box-shadow;
    overflow: visible;

    &::focus {
      outline: none;
    }

    &::after {
      content: "";
      padding-bottom: 100%;
      display: block;
    }

    &[disabled] {
      pointer-events: none;
    }
  `
])

export const ButtonInner = styled.div(({ revealed, busted, loader }: { revealed: boolean, busted: boolean, loader: boolean }) => [
...(revealed ? [
  `
    background-color: var(--darkest-blue);
  `
] : [
  `
    background-color: var(--light-blue);
    box-shadow: var(--dark-blue) 0px 0.3rem;
  `,
  ...(busted ? [
    `
      background-color: var(--darkest-blue);
      box-shadow: none;
      svg {
        width: 35%;
        height: 35%;
        opacity: 0.3;
      }
    `
  ] : []),
]),
...(loader ? [
  `
    animation-name: pulse;
    animation-duration: 600ms;
    animation-iteration-count: infinite;
  `
] : []),
`
  position: absolute;
  inset: 0;
  border-radius: 0.3rem;
  transition-property: transform, background, box-shadow;
  will-change: transform, background, box-shadow;
  transition-duration: 300ms;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--lightest-blue);
    transform: translateY(-0.15rem);
  }
`
])

export const GameAside = styled.aside`
  width: 300px;
  background-color: var(--light-blue);
  padding: 1rem;
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
`

export const Button = styled.button`
  cursor: pointer;
  width: 100%;
  outline: none;
  border: 0;
  margin-top: 1rem;
  font-weight: 600;
  border-radius: 0.25rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: var(--green);
  color: var(--dark-green);
  box-shadow: rgb(0 0 0 / 20%) 0px 1px 3px 0px, rgb(0 0 0 / 12%) 0px 1px 2px 0px;
  max-width: 300px;
  padding: 1rem;
  user-select: none;
`

export const Select = styled.select`
  padding: 0.5em 2em 0.5em 0.5em;
  cursor: pointer;
  width: 100%;
  color: var(--white);
  background: var(--dark-blue);
  outline: none;
  border: solid 2px var(--darkest-blue);
  border-radius: 0.25rem;
`

export const WobbleWrapper = styled.span`
  animation-name: wobble;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.87, -0.41, 0.19, 1.44);
`

export const ShakeWrapper = styled.span(({ revealed }: { revealed: boolean }) => ([
  ...(revealed ? [
    `
      will-change: transform filter;
      animation-name: shake;
      animation-duration: 500ms;
      animation-iteration-count: 1;
      animation-timing-function: cubic-bezier(0.87, -0.41, 0.19, 1.44);
    `
  ] : [])
]));

export const ZoomInWrapper = styled.span(({ revealed }: { revealed: boolean }) => ([
  ...(revealed ? [
    `
      will-change: transform filter;
      animation-duration: 300ms;
      animation-fill-mode: forwards;
      animation-timing-function: cubic-bezier(0.87, -0.41, 0.19, 1.44);
      animation-name: zoomin;
    `
  ] : [])
]));
