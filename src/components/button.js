import React from 'react'
import styled from 'styled-components'
import TextBlock from '../components/textblock'

const ButtonStyle = styled.a`
  background-color: #000000;
  color: #ffffff;
  text-decoration: none;
  padding: 10px 20px;
  margin: ${props => (props.margin ? props.margin : '0px')};
  display: inline-block;

  .arrow {
    width: 10px;
    padding-left: 10px;
  }
`

export default props => (
  <ButtonStyle href={props.href} target={props.target} margin={props.margin}>
    {props.children}
    {props.external ? (
      <img src="img/arrow.svg" className="arrow" alt="arrow" />
    ) : (
      ''
    )}
  </ButtonStyle>
)
