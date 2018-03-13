import React from 'react'
import styled from 'styled-components'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
import TextBlock from '../components/textblock'
import CapInput from '../components/cap-input'
import Link from 'gatsby-link'
import { media } from '../components/media-query'
import Img from 'gatsby-image'

const OverlayContainer = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  background: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 100%;
  z-index: 200;
  transition: all ease-in-out 1s;
  opacity: ${props => (props.showOverlay ? '1' : '0')};
  visibility: ${props => (props.showOverlay ? 'visible' : 'hidden')};
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  .overlay-wrapper {
    overflow-y: scroll;
  }
  .closeOverlayContainer {
    text-align: right;
    .closeOverlay {
      display: inline-block;
      font-size: 30px;
      color: #000000;
      position: relative;
      cursor: pointer;
      z-index: 10;
      width: 30px;
      height: 30px;
      padding-top: 15px;
      span {
        height: 4px;
        width: 100%;
        display: block;
        background-color: #000000;
        position: absolute;
      }
      span:first-child {
        transform: rotate(-45deg);
      }
      span:last-child {
        transform: rotate(45deg);
      }
    }
  }

  .container {
    background-color: #ffffff;
    padding: 20px;
  }
  .swiper-container {
    width: 100%;
    height: calc(100vh - 200px - 50px);
    ${media.phone`
    height: calc(100vh - 80px - 50px);
    `};
    margin-left: auto;
    margin-right: auto;
    .gatsby-image-outer-wrapper {
      width: 100%;
      height: 100%;
      .gatsby-image-wrapper {
        width: 100%;
        height: 100%;
      }
    }
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .thumbswiper {
    height: 20vh;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .thumbswiper .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
    cursor: pointer;
  }
  .thumbswiper .swiper-slide-active {
    opacity: 1;
  }
  .swiper-slide {
    background-size: cover;
    background-position: center;
  }
  .infoheader {
    font-size: 30px;
    font-weight: 700;
    ${media.phone`
    padding-bottom: 20px;
    `};
  }
  h3 {
    font-weight: 100;
    margin: 0;
  }
  .cartext {
    padding-bottom: 40px;
    ${media.phone`
    text-align: left;
    width: 80%;
    margin: auto;
    `};
    ul {
      display: inline-block;
      width: auto;
      text-align: left;
    }
  }
  .carheader {
    ${media.phone`
      padding-top: 30px;
      padding-bottom: 10px;
      width: 80%;
      margin: auto;
    `};
  }
  hr {
    border-top: 1px solid #f1f1f1;
    border-bottom: 0px;
    border-color: #dedede;
    margin: 20px 0px 40px 0px;
  }
  .infocard {
    background-color: #f1f1f1;
    padding: 30px;
    height: 290px;
    margin: 10px 0px 10px 0px;
    ${media.phone`
    height: auto;
    `};
    .infoheader {
      text-align: center;
      padding-bottom: 20px;
    }
    .infostats {
      display: flex;
      line-height: 30px;
      font-size: 18px;
      font-weight: 100;
      .infospecvalue {
        text-align: right;
        flex-grow: 1;
      }
    }
  }

  .smallspacing {
    margin-top: 30px;
  }
  .smallwidth {
    max-width: 500px;
    margin: auto;
    ${media.phone`
     width: 80%;
    `};
  }
  .cta {
    padding-bottom: 50px;
    .contact {
      margin-top: 20px;
      display: inline-block;
      background-color: #000000;
      padding: 20px 35px;
      font-size: 16px;
      color: #ffffff;
      text-decoration: none;
      font-size: 20px;
      font-weight: 600;
    }
  }
`
const Click = styled.span`
  font-weight: 700;
  cursor: pointer;
  &:after {
    margin-left: 10px;
    font-weight: 100;
    content: 'v';
    transform: ${props => (props.clicked ? 'deg(0)' : 'rotate(-90deg)')};
    position: absolute;
    transition: transform 0.2s ease-in-out;
  }
`

const Contracted = styled.div`
  max-height: ${props => (props.show ? '2000px' : '0px')};
  transition: max-height 0.5s ease-in-out;
  overflow: hidden;
`

const fineNumber = intNumber => {
  return parseInt(intNumber)
    .toFixed(0)
    .replace(/./g, function(c, i, a) {
      return i && c !== '.' && (a.length - i) % 3 === 0 ? '.' + c : c
    })
}

const Overlay = class Overlay extends React.Component {
  state = {
    udvidetinfo: false,
    kontakt: false,
  }
  swiperConfig = {
    loop: false,
    setWrapperSize: false,
    pagination: '.swiper-pagination',
    paginationClickable: false,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
  }
  swiperThumbConfig = {
    spaceBetween: 10,
    centeredSlides: true,
    slidesPerView: 'auto',
    touchRatio: 0.2,
    slideToClickedSlide: true,
    loop: false,
  }
  closeOverlay() {
    /* this.swiper.destroy(true)
    this.thumbswiper.destroy(true) */
    this.props.closeOverlay()
  }
  componentDidUpdate() {
    this.swiper = new Swiper(this.refs.topswiper, this.swiperConfig)
    this.thumbswiper = new Swiper(this.refs.thumbswiper, this.swiperThumbConfig)
    this.swiper.controller.control = this.thumbswiper
    this.thumbswiper.controller.control = this.swiper
  }
  render() {
    let slide = {}
    let thumbs = {}
    if (this.props.overlayData.node) {
      slide = this.props.overlayData.node.frontmatter.pictures.picturelist.map(
        (item, index) => {
          return (
            <div key={`slide-${index}`} id={item.id} className="swiper-slide">
              <Img sizes={item.image.childImageSharp.sizes} />
            </div>
          )
        }
      )
    }
    if (this.props.overlayData.node) {
      thumbs = this.props.overlayData.node.frontmatter.pictures.picturelist.map(
        (item, index) => {
          return (
            <div key={`thumb-${index}`} className="swiper-slide">
              <Img sizes={item.image.childImageSharp.sizes} />
            </div>
          )
        }
      )
    }
    return (
      <OverlayContainer showOverlay={this.props.showOverlay}>
        {this.props.overlayData.node && (
          <div className="overlay-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-md-12 col-xs-12">
                  <div className="closeOverlayContainer">
                    <div
                      className="closeOverlay"
                      onClick={this.closeOverlay.bind(this)}
                    >
                      <span />
                      <span />
                    </div>
                  </div>

                  <div ref="topswiper" className="swiper-container topswiper">
                    <div ref="swiperWrapper" className="swiper-wrapper">
                      {slide}
                    </div>
                    <div className="swiper-pagination" />
                    <div
                      className="swiper-button-next swiper-button-white"
                      onClick={() => this.swiper.slideNext()}
                    />
                    <div
                      className="swiper-button-prev swiper-button-white"
                      onClick={() => this.swiper.slidePrev()}
                    />
                  </div>
                  <div
                    ref="thumbswiper"
                    className="swiper-container thumbswiper"
                  >
                    <div className="swiper-wrapper">{thumbs}</div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <TextBlock
                    translateFrom={`translateX(-20px)`}
                    translateTo={`translateX(0px)`}
                    transitionDelay={`0.2s`}
                    triggerOnce={true}
                    padding="0px 0px 10px 40px"
                  >
                    <h2 className="center carheader">
                      {this.props.overlayData.node.frontmatter.title}
                    </h2>
                    <div
                      className="center cartext"
                      dangerouslySetInnerHTML={{
                        __html: this.props.overlayData.node.html,
                      }}
                    />
                  </TextBlock>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4 col-xs-12 center">
                  <h3>Årgang</h3>
                  <div className="infoheader">
                    {this.props.overlayData.node.frontmatter.year}
                  </div>
                </div>
                <div className="col-md-4 col-xs-12 center">
                  <h3>Mdl. ydelse</h3>
                  <div className="infoheader">
                    {fineNumber(
                      this.props.overlayData.node.frontmatter.monthlycost
                    )}&nbsp; kr
                  </div>
                </div>
                <div className="col-md-4 col-xs-12 center">
                  <h3>Førstegangsydelse</h3>
                  <div className="infoheader">
                    {fineNumber(
                      this.props.overlayData.node.frontmatter.firstcost
                    )}&nbsp; kr
                  </div>
                </div>
              </div>
              <div className="smallspacing" />
              <div className="row">
                <div className="col-md-4 col-xs-12 center">
                  <Click
                    onClick={() => {
                      this.setState({
                        udvidetinfo: !this.state.udvidetinfo,
                        kontakt: false,
                      })
                    }}
                    clicked={this.state.udvidetinfo}
                  >
                    Udvidet information
                  </Click>
                </div>
                <div className="col-md-4 col-xs-12" />
                <div className="col-md-4 col-xs-12 center">
                  <Click
                    className="clickable"
                    onClick={() => {
                      this.setState({
                        kontakt: !this.state.kontakt,
                        udvidetinfo: false,
                      })
                    }}
                    clicked={this.state.kontakt}
                  >
                    Kontakt mig
                  </Click>
                </div>
              </div>

              <Contracted show={this.state.udvidetinfo}>
                <div className="row">
                  <div className="col-md-12">
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-xs-12">
                    <div className="infocard">
                      <div className="infoheader">MOTOR</div>
                      <div className="infostats">
                        <div className="infospec">Volumen</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.volume}
                        </div>
                      </div>
                      <div className="infostats">
                        <div className="infospec">Cylindre</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.cylindre}
                        </div>
                      </div>
                      <div className="infostats">
                        <div className="infospec">Antal ventiler</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.ventiler}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-12">
                    <div className="infocard">
                      <div className="infoheader">TRANSMISSION</div>
                      <div className="infostats">
                        <div className="infospec">Gear</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.gear}
                        </div>
                      </div>
                      <div className="infostats">
                        <div className="infospec">Træk</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.traek}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-xs-12">
                    <div className="infocard">
                      <div className="infoheader">INFO</div>
                      <div className="infostats">
                        <div className="infospec">Type</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.type}
                        </div>
                      </div>
                      <div className="infostats">
                        <div className="infospec">Første reg.</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.foerstereg}
                        </div>
                      </div>
                      <div className="infostats">
                        <div className="infospec">Kilometer</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.kilometer}
                        </div>
                      </div>
                      <div className="infostats">
                        <div className="infospec">Brændstof</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.braendstof}
                        </div>
                      </div>
                      <div className="infostats">
                        <div className="infospec">Farve</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.farve}
                        </div>
                      </div>
                      <div className="infostats">
                        <div className="infospec">Døre</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.doere}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-xs-12">
                    <div className="infocard">
                      <div className="infoheader">YDELSE</div>
                      <div className="infostats">
                        <div className="infospec">Effekt</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.effekt} Hk.
                        </div>
                      </div>
                      <div className="infostats">
                        <div className="infospec">Moment</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.moment} Nm
                        </div>
                      </div>
                      <div className="infostats">
                        <div className="infospec">Topfart</div>
                        <div className="infospecvalue">
                          {this.props.overlayData.node.frontmatter.topfart} km/t
                        </div>
                      </div>
                      <div className="infostats">
                        <div className="infospec">0-100</div>
                        <div className="infospecvalue">
                          {
                            this.props.overlayData.node.frontmatter
                              .nultilhundrede
                          }{' '}
                          sek
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Contracted>
              <Contracted show={this.state.kontakt}>
                <div className="row">
                  <div className="col-md-12 col-xs-12">
                    <div className="smallspacing" />
                    <hr />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12 center">
                    <TextBlock
                      translateFrom={`translateX(-20px)`}
                      translateTo={`translateX(0px)`}
                      transitionDelay={`0.2s`}
                      triggerOnce={true}
                      padding="0px 0px 10px 40px"
                    >
                      <h2 className="center">Kontakt mig vedr. denne bil</h2>
                      <div className="smallwidth center">
                        Ydfyld nedenstående kontaktformular og en af vores
                        sælgere vil vende tilbage til dig og svare på alle dine
                        spørgsmål
                      </div>
                    </TextBlock>
                    <div className="smallspacing" />
                    <div className="form">
                      <CapInput
                        placeholder="Navn"
                        width="80%"
                        margin="15px 0px"
                      />
                      <CapInput
                        placeholder="Email adresse"
                        width="80%"
                        margin="15px 0px"
                      />
                      <CapInput
                        placeholder="Telefonnummer"
                        width="80%"
                        margin="15px 0px"
                      />
                    </div>
                    <div className="cta">
                      <Link className="contact">Kontakt mig</Link>
                    </div>
                  </div>
                </div>
              </Contracted>
            </div>
          </div>
        )}
      </OverlayContainer>
    )
  }
}

export default Overlay
