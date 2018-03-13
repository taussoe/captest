import React from 'react'
import Hero from './hero'
import Statement from './statement'
import TextBlock from './textblock'
import Instagram from '../components/instagram'
import Kontakt from '../components/kontakt'
import ParallaxImage from '../components/parallax-image'
import MarkdownRenderer from 'react-markdown-renderer'
import Img from 'gatsby-image'

const CapComponent = class CapComponent extends React.Component {
  render() {
    const c = this.props.data.component
    switch (c) {
      case 'Hero':
        return <Hero height="100vh" image={this.props.data.image} />
        break
      case 'Statement':
        return (
          <Statement>
            <h2>{this.props.data.overskrift}</h2>
            <span>{this.props.data.text}</span>
          </Statement>
        )
      case 'PictureRight':
        return (
          <div className="container">
            <div className="row spacing">
              <div className="col-md-5 col-sm-5 margin-top-auto order-2 col-xs-12">
                <div className="text-padding-right">
                  <TextBlock
                    translateFrom={`translateX(-20px)`}
                    translateTo={`translateX(0px)`}
                    transitionDelay={`0.2s`}
                    triggerOnce={true}
                    padding="0px 0px 10px 40px"
                  >
                    <h2>{this.props.data.overskrift}</h2>
                    <span>{this.props.data.text}</span>
                  </TextBlock>
                </div>
              </div>
              <div className="col-md-7 col-sm-7 order-1 col-xs-12">
                <TextBlock
                  translateFrom={`translateX(20px)`}
                  translateTo={`translateX(0px)`}
                  transitionDelay={`0.2s`}
                  triggerOnce={true}
                  padding="0px"
                  minHeight="400px"
                >
                  <Img sizes={this.props.data.image.childImageSharp.sizes} />
                </TextBlock>
              </div>
            </div>
          </div>
        )
      case 'PictureLeft':
        return (
          <div className="container">
            <div className="row spacing">
              <div className="col-md-7 col-sm-7 col-xs-12">
                <TextBlock
                  translateFrom={`translateX(-20px)`}
                  translateTo={`translateX(0px)`}
                  transitionDelay={`0.2s`}
                  triggerOnce={true}
                  padding="0px"
                  minHeight="400px"
                >
                  <Img sizes={this.props.data.image.childImageSharp.sizes} />
                </TextBlock>
              </div>
              <div className="col-md-5 col-sm-5 col-xs-12 margin-top-auto">
                <div className="text-padding-left">
                  <TextBlock
                    translateFrom={`translateX(20px)`}
                    translateTo={`translateX(0px)`}
                    transitionDelay={`0.2s`}
                    triggerOnce={true}
                    padding="0px 40px 10px 0px"
                  >
                    <h2>{this.props.data.overskrift}</h2>
                    <span>{this.props.data.text}</span>
                  </TextBlock>
                </div>
              </div>
            </div>
          </div>
        )
      case 'Instagram':
        return <Instagram />
      case 'Kontakt':
        return (
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12 center">
                <TextBlock
                  translateFrom={`translateX(20px)`}
                  translateTo={`translateX(0px)`}
                  transitionDelay={`0.2s`}
                  triggerOnce={true}
                  maxWidth="70%"
                  padding="150px 0px 10px 0px"
                >
                  <div className="mobile-spacer" />
                  <h2>{this.props.data.overskrift}</h2>
                  <span>{this.props.data.text}</span>
                </TextBlock>
              </div>
            </div>
            <div className="row spacing">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <Kontakt data={this.props.alldata.kontaktpersoner.edges} />
              </div>
            </div>
          </div>
        )
      case 'Parallax':
        return (
          <ParallaxImage image={this.props.data.image.childImageSharp.sizes}>
            <h2 className="white">{this.props.data.overskrift}</h2>
            <span className="white">
              <MarkdownRenderer markdown={this.props.data.text} />
            </span>
          </ParallaxImage>
        )
      default:
        return <div>Component not recognized</div>
    }
  }
}

export default CapComponent
