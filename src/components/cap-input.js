import React from 'react'
import styled from 'styled-components'

const CapInput = styled.input`
  background-color: #f1f1f1;
  padding: 20px;
  border: none;
  font-size: 20px;
  width: ${props => (props.width ? props.width : '100%')};
  box-sizing: border-box;
  margin: ${props => (props.margin ? props.margin : '0px')};
`

export default props => <CapInput type="text" {...props} />
