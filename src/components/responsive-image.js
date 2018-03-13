import React from 'react'
import styled from 'styled-components'
import Observer from 'react-intersection-observer'

const ImageContainer = styled.div`
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  transition: all 0.8s ease-in-out;
  opacity: ${props => (!props.isLoading ? '1' : '0')};
  transition-delay: 200ms;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  height: 100%;
  width: 100%;
  img {
    width: ${props => (props.width ? props.width : '100%')};
    visibility: hidden;
    opacity: 0;
  }
`

const ResponsiveImage = class ResponsiveImage extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
    }
  }

  handleImageLoaded = () => {
    // console.log('image loaded')
    this.setState({ loading: false })
  }
  handleImageError = () => {
    // console.log('error loading image')
  }
  componentDidMount() {
    // console.log(this.props)
    let imageUrl = this.props.src
    this.image = new Image()
    this.image.src = imageUrl
    this.image.onload = this.handleImageLoaded
    this.image.onerror = this.handleImageError
  }
  render() {
    return (
      <ImageContainer
        backgroundImage={this.props.src}
        isLoading={this.state.loading}
        width={this.props.width}
      >
        <img src={this.props.src} alt="image" />
      </ImageContainer>
    )
  }
}

export default ResponsiveImage
