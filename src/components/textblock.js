import React from 'react'
import styled from 'styled-components'
import Observer from 'react-intersection-observer'
import { media } from '../components/media-query'

const TextBlockStyle = styled.div`
  padding: ${props => (props.padding ? props.padding : '50px')};
  overflow: hidden;
  ${media.phone`
  padding: 0px;
  `};
  opacity: ${props => (props.show ? '1' : '0')};
  transition: 0.5s ease-in-out all;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  transform: ${props => (props.show ? props.translateTo : props.translateFrom)};
  transition-delay: ${props => props.transitionDelay};
  margin: ${props => (props.maxWidth ? 'auto' : '0px')};
  max-width: ${props => (props.maxWidth ? props.maxWidth : 'none')};
  span {
    white-space: pre-line;
  }
  &.bottom {
    /* position: absolute;
    bottom: 0px; */
  }
  h1,
  h2,
  h3 {
    position: relative;
    color: ${props => (props.show ? '#000000' : '#ffffff')};
    transition: color ease-in 0.1s;
    transition-delay: 0.5s;
    ${media.phone`
    text-align: center;
    `};
    &:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 15;
      transform-origin: left center;
      background: #000000;
      animation: ${props =>
        props.show
          ? 'headeranim 1s cubic-bezier(0.77, 0, 0.175, 1) forwards'
          : ''};
      animation-delay: ${props => props.transitionDelay};
    }
  }
  @keyframes headeranim {
    0% {
      transform-origin: left center;
      transform: scaleX(0);
    }
    50% {
      transform-origin: left center;
      transform: scaleX(1);
    }
    50.001% {
      transform-origin: right center;
    }
    100% {
      transform-origin: right center;
      transform: scaleX(0);
    }
  }
  min-height: ${props => (props.minHeight ? props.minHeight : 'auto')};
  height: 100%;
  .gatsby-image-outer-wrapper {
    height: 100%;
    .gatsby-image-wrapper {
      height: 100%;
    }
  }
`

export default props => (
  <Observer
    triggerOnce={props.triggerOnce}
    threshold={0}
    style={{ height: '100%' }}
  >
    {inView => (
      <TextBlockStyle
        translateFrom={
          props.translateFrom ? props.translateFrom : 'translateY(-10px)'
        }
        translateTo={props.translateTo ? props.translateTo : 'translateY(0px)'}
        show={inView}
        className={props.className}
        transitionDelay={props.transitionDelay ? props.transitionDelay : '0s'}
        padding={props.padding}
        maxWidth={props.maxWidth}
        minHeight={props.minHeight}
      >
        {props.children}
      </TextBlockStyle>
    )}
  </Observer>
)
