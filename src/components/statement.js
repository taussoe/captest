import React from 'react'
import styled from 'styled-components'
import TextBlock from '../components/textblock'
import { media } from './media-query'

const StatementContainer = styled.div`
  height: 100vh;
  position: relative;
  .text {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    width: 80%;
    text-align: center;
    transition: 1s ease-in-out all;
    max-width: 800px;
    line-height: 26px;
    ${media.phone`
      width: 70%;
    `};
  }
`

export default props => (
  <StatementContainer>
    <div className="text">
      <TextBlock
        translateFrom={`translateX(20px)`}
        translateTo={`translateX(0px)`}
        transitionDelay={`0.2s`}
        triggerOnce={true}
      >
        {props.children}
      </TextBlock>
    </div>
  </StatementContainer>
)
