import React from 'react'
import Menu from '../components/menu'
import Footer from '../components/footer'
import { InterScroll } from '../components/functions'
import styled from 'styled-components'
import Script from 'react-load-script'
import HalfHero from '../components/half-hero'
import CapComponent from '../components/cap-component'
import CarListing from '../components/car-listing'
import Overlay from '../components/overlay'
import { media } from '../components/media-query'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'

const Main = styled.div`
  margin-bottom: 434px;
  ${media.phone`
  margin-bottom: 434px;
  `};
  z-index: 2;
  background-color: #ffffff;
  position: relative;
  border-bottom: 1px solid #eee;
  h1 {
    font-size: 65px;
    font-weight: 800;
    ${media.phone`
    font-size: 40px;
    `};
  }

  h2 {
    font-size: 40px;
    ${media.phone`
    font-size: 30px;
    line-height: 34px;
    `};
    font-weight: 800;
    text-transform: uppercase;
    line-height: 53px;
  }
  .text-padding-left {
    padding: 0px 0px 0px 30px;
    ${media.phone`
    padding: 50px;
    `};
  }
  .text-padding-right {
    padding: 0px 30px 0px 0px;
    ${media.phone`
    padding: 50px;
    `};
  }
  ${media.phone`
  .row {
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    }
  `};
  ${media.tablet`
  .row {
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    }
    .container {
      width: auto;
    }
  `};
`

export default class Showroom extends React.Component {
  state = {
    showOverlay: false,
    overlayData: {},
  }

  handleScroll = (id, duration) => {
    InterScroll(ReactDOM.findDOMNode(this.refs[id]), 2000)
  }
  scrollToBrand(e) {
    let carmodelid = `carmodel-${e}`
    this.handleScroll(carmodelid, 2000)
  }
  componentDidMount() {
    console.log('mount')
  }
  render() {
    let sortedModels = this.props.data.carmodel.edges
    sortedModels.sort(function(a, b) {
      if (a.title < b.title) return -1
      if (a.title > b.title) return 1
      return 0
    })
    let cars = sortedModels.map((e, i) => {
      let component = i % 2 === 0 ? 'PictureRight' : 'PictureLeft'
      let carmodelid = `carmodel-${i}`
      let data = {
        component: component,
        overskrift: e.node.frontmatter.title,
        text: e.node.frontmatter.text,
        image: e.node.frontmatter.carimage,
        elementid: carmodelid,
      }
      let listing = this.props.data.cars.edges.filter(
        elem => elem.node.frontmatter.carmodel === e.node.frontmatter.title
      )
      return (
        <div key={`carmodel-${i}`} ref={carmodelid}>
          <div className="text">
            <CapComponent data={data} alldata={this.props.data} />
          </div>
          <CarListing data={listing} />
        </div>
      )
    })
    console.log(this.props)
    return (
      <div>
        <Helmet
          title={`Cap Leasing`}
          meta={[
            {
              name: 'description',
              content: this.props.data.markdownRemark.frontmatter.text,
            },
            {
              property: 'og:title',
              content: `Cap Leasing | Showroom`,
            },
            {
              property: 'og:description',
              content: this.props.data.markdownRemark.frontmatter.text,
            },
            {
              property: 'og:url',
              content: `https://capleasing.dk${this.props.location.pathname}`,
            },
            {
              property: 'og:image:secure_url',
              content: `https://capleasing.dk${this.props.data.markdownRemark
                .frontmatter.image.childImageSharp.sizes.src}`,
            },
            {
              property: 'og:image',
              content: `https://capleasing.dk${this.props.data.markdownRemark
                .frontmatter.image.childImageSharp.sizes.src}`,
            },
          ]}
        />
        <Main>
          <HalfHero
            src={this.props.data.markdownRemark.frontmatter.image}
            text={this.props.data.markdownRemark.frontmatter.text}
            carmodel={sortedModels}
            scrollToBrand={this.scrollToBrand.bind(this)}
          />
          <div className="spacing" />
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-xs-12">{cars}</div>
            </div>
          </div>
        </Main>
        <Footer interScroll={(event, m) => this.props.interScroll(event, m)} data={this.props.data} />
      </div>
    )
  }
}

export const pageQuery = graphql`
  query indexShowroom {
    home: markdownRemark(frontmatter: { path: { eq: "/" } }) {
      html
      frontmatter {
        path
        description
        title
        components {
          sektioner {
            component
            overskrift
            text
            menuname
          }
        }
      }
    }
    carmodel: allMarkdownRemark(
      filter: { frontmatter: { path: { regex: "/carmodel/" } } }
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            carimage {
              id
              childImageSharp {
                sizes(maxWidth: 1200) {
                  tracedSVG
                  sizes
                  src
                }
              }
            }
            text
          }
        }
      }
    }
    cars: allMarkdownRemark(
      filter: { frontmatter: { path: { regex: "/cars/" } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            path
            carmodel
            title
            monthlycost
            kilometer
            year
            pictures {
              picturelist {
                image {
                  id
                  childImageSharp {
                    sizes(maxWidth: 400) {
                      sizes
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    markdownRemark(frontmatter: { path: { eq: "/showroom" } }) {
      frontmatter {
        title
        image {
          id
          childImageSharp {
            sizes(maxWidth: 1200) {
              tracedSVG
              sizes
              src
            }
          }
        }
        path
        text
      }
    }
  }
`
