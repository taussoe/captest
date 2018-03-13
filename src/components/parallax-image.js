import React from 'react'
import { Parallax } from 'react-parallax'
import styled from 'styled-components'
import { media } from '../components/media-query'

const ParallaxImageContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .parallaximage {
    width: 60%;
    ${media.phone`
    width: 80%;
    `};
    ul {
      display: inline-block;
    }
    a {
      text-decoration: underline;
      color: #ffffff;
    }
  }
`

export default props => (
  <Parallax bgImage={props.image.src} strength={200}>
    <div className="container">
      <div className="row">
        <div className="col-md-12 center">
          <ParallaxImageContainer>
            <div className="parallaximage">{props.children}</div>
          </ParallaxImageContainer>
        </div>
      </div>
    </div>
  </Parallax>
)
