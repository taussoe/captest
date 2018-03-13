import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Script from 'react-load-script'
import styled, { injectGlobal } from 'styled-components'
import CapComponent from '../components/cap-component'
import Footer from '../components/footer'
import slug from 'slug'
import { media } from '../components/media-query'

injectGlobal`
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,800');
*  {
  box-sizing: border-box;
  &:focus {
    outline: 0 !important;
  }
}
html,body {
  font-family: 'Open Sans', sans-serif;
  margin: 0;
  padding: 0;
}
h1, h2 {
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
}

.spacing {
  padding: 50px 0px;
}

.margin-top-auto {
  margin-top: auto;
}

.center {
  text-align: center;
}
.white {
  color: #ffffff;
}
.h500 {
  height: 500px;
}
.no-overflow {
  overflow: hidden;
}
.container {
  /* overflow: hidden; */
}
@media screen and (max-width:567px) {
    .visible-sm{display:none}
    .visible-md{display:none}
    .visible-lg{display:none}
    .visible-xl{display:none}
    .hidden-xs{display:none}
}
@media screen and (max-width:768px) {
    .hidden-sm{display:none}
}
`

const Main = styled.div`
  margin-bottom: 434px;
  ${media.phone`
  margin-bottom: 434px;
  `};
  z-index: 2;
  background-color: #ffffff;
  position: relative;
  border-bottom: 1px solid #eee;
  width: 100%;
  /* overflow: hidden; */
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
  .order-1 {
    ${media.phone`
      order: 1;
    `};
  }
  .order-2 {
    ${media.phone`
      order: 2;
    `};
  }
  ${media.phone`
  .mobile-spacer {
    height: 40px;
  }
  
  `};
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

export default class IndexPage extends React.Component {
  componentDidMount() {
    this.props.setRefs(this.refs)
  }
  handleScriptLoad() {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/'
          })
        }
      })
    }
    window.netlifyIdentity.init()
  }

  render() {
    const c = this.props.data.home.frontmatter.components.sektioner
    return (
      <div>
        <Helmet
          title={`Cap Leasing`}
          meta={[
            {
              name: 'description',
              content: this.props.data.home.frontmatter.description,
            },
            {
              property: 'og:title',
              content: `Cap Leasing`,
            },
            {
              property: 'og:description',
              content: this.props.data.home.frontmatter.description,
            },
            {
              property: 'og:url',
              content: `https://capleasing.dk${this.props.location.pathname}`,
            },
            {
              property: 'og:image:secure_url',
              content: `https://capleasing.dk${this.props.data.home.frontmatter
                .image.childImageSharp.sizes.src}`,
            },
            {
              property: 'og:image',
              content: `https://capleasing.dk${this.props.data.home.frontmatter
                .image.childImageSharp.sizes.src}`,
            },
          ]}
        />
        <Main>
          <Script
            url="https://identity.netlify.com/v1/netlify-identity-widget.js"
            onLoad={this.handleScriptLoad.bind(this)}
          />

          {c.map((e, i) => {
            let vref = e.menuname ? slug(e.menuname) : `component-${i}`
            return (
              <CapComponent
                key={`component-${i}`}
                ref={vref}
                data={e}
                alldata={this.props.data}
              />
            )
          })}
        </Main>
        <Footer interScroll={(event, m) => this.props.interScroll(event, m)} data={this.props.data} />
      </div>
    )
  }
}

export const pageQuery = graphql`
  query indexKontaktAndIndexByPath {
    home: markdownRemark(frontmatter: { path: { eq: "/" } }) {
      html
      frontmatter {
        path
        description
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
        components {
          sektioner {
            component
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
            overskrift
            text
            menuname
          }
        }
      }
    }
    kontaktpersoner: allMarkdownRemark(
      filter: { frontmatter: { path: { regex: "/kontaktpersoner/" } } }
    ) {
      edges {
        node {
          frontmatter {
            contactimage
            title
            contacttitle
            contacteducation
            contacttelephone
            contactemail
          }
        }
      }
    }
  }
`
