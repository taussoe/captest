import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Flexboxgrid from 'flexboxgrid'
import Menu from '../components/menu'
import { InterScroll } from '../components/functions'
import ReactDOM from 'react-dom'

const TemplateWrapper = class TemplateWrapper extends React.Component {
  state = {
    scrollTo: undefined,
  }
  interScrollTo = {
    scrollTo: null,
    scrollDuration: null,
  }
  handleScroll = (id, duration) => {
    if (ReactDOM.findDOMNode(this.state.childRef[id])) {
      InterScroll(ReactDOM.findDOMNode(this.state.childRef[id]), 2000)
    } else {
      this.setState({
        scrollTo: id,
      })
    }
  }
  setRefs(r) {
    this.setState(
      {
        childRef: r,
      },
      () => {
        if (this.state.scrollTo) {
          this.handleScroll(this.state.scrollTo, 2000)
        }
      }
    )
  }
  showMenu() {
    this.setState({
      showMenu: true,
    })
  }
  hideMenu() {
    this.setState({
      showMenu: false,
    })
  }
  interScroll(e, m) {
    this.setState(
      {
        scrollTo: m,
      },
      () => {
        this.handleScroll(this.state.scrollTo, 2000)
      }
    )
  }
  render() {
    const setRefs = this.setRefs.bind(this)
    const handleShowMenu = this.showMenu.bind(this)
    const handleHideMenu = this.hideMenu.bind(this)
    const interScroll = this.interScroll.bind(this)
    
    const { location } = this.props
    let p = this.props.location.pathname.split('/')
    let showMenu = false
    if (
      this.props.location.pathname === '/showroom' ||
      this.props.location.pathname === '/showroom/' ||
      this.props.location.pathname === '/' ||
      this.props.location.pathname === ''
    ) {
      showMenu = true
    }
    return (
      <div>
        <Menu
          interScroll={(event, m) => interScroll(event, m)}
          data={this.props.data}
          showMenu={showMenu}
        />
        <div>
          {this.props.children({
            ...this.props,
            setRefs,
            handleHideMenu,
            handleShowMenu,
            interScroll
          })}
        </div>
      </div>
    )
  }
}

export default TemplateWrapper

export const pageQuery = graphql`
  query menuQuery {
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
  }
`
