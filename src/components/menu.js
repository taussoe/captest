import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'
import Observer from 'react-intersection-observer'
import { InterScroll } from './functions'
import ReactDOM from 'react-dom'
import slug from 'slug'
import { media } from '../components/media-query'

const Navigation = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
  width: 100%;
  transition: background-color ease-in-out 0.5s, border-bottom ease-in-out 0.5s,
    transform ease-in-out 0.5s;
  background-color: ${props => (props.solidMenu ? '#ffffff' : 'transparent')};
  padding: 5px 0px 5px 0px;
  transform: translateY(${props => (props.showMenu ? '0%' : '-100%')});
  border-bottom: ${props =>
    props.solidMenu ? '1px solid #eeeeee' : '1px solid transparent'};
  ${media.phone`
    background-color: #ffffff;
    max-height: 65px;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
    &.open {
      max-height: 500px;
    }
    `};
  .logo {
    position: absolute;
    top: 15px;
    right: 30px;
    display: block;
    ${media.phone`
    right: 5px;
    `};
    img {
      width: 35px;
      ${media.phone`
      max-height: 35px;
      `};
    }
  }
  ul {
    display: flex;
    list-style: none;
    font-weight: 700;
    ${media.phone`
    flex-direction: column;
    padding: 0px;
    `};
  }
`

const MenuLi = styled.li`
  padding: 20px 10px;
  transition: ease-in-out all 0.2s;
  transition-delay: ${props => (props.tDelay ? props.tDelay : '0')}s;
  opacity: ${props => (props.show ? '1' : '0')};
  transform: ${props => (props.show ? 'translateY(0px)' : 'translateY(-10px)')};
  ${media.phone`
  width: 100%;
  text-align: center;
  transform: ${props => (props.show ? 'translateX(0px)' : 'translateX(-20px)')};
  `};
  a {
    text-decoration: none;
    color: #1d1e1c;
  }
`

const BurgerMenu = styled.div`
  display: none;
  width: 35px;
  height: 40px;
  position: relative;
  margin-top: 15px;
  margin-left: 10px;
  ${media.phone`
    display: block;
  `};
  span {
    position: absolute;
    display: block;
    height: 4px;
    background-color: #000000;
    width: 100%;
    transition: all 0.2s ease-in-out;
    &:first-child {
      top: 0px;
    }
    &:nth-child(2) {
      top: 10px;
      left: 0px;
      /* opacity: 1; */
    }
    &:nth-child(3) {
      top: 20px;
    }
  }
  &.open {
    span {
      &:first-child {
        transform: rotate(45deg);
        top: 10px;
      }
      &:nth-child(2) {
        left: -40px;
        opacity: 0;
        top: 10px;
      }
      &:nth-child(3) {
        transform: rotate(-45deg);
        top: 10px;
      }
    }
  }
`

const Menu = class Menu extends React.Component {
  state = {
    solidMenu: false,
    mobileOpen: false,
  }
  handleScroll() {
    if (window.pageYOffset > 20 && !this.state.solidMenu) {
      this.setState({
        solidMenu: true,
      })
    } else if (window.pageYOffset < 20 && this.state.solidMenu) {
      this.setState({
        solidMenu: false,
      })
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }
  menuClick(e, menuname) {
    //e.preventDefault()
    let gRef = slug(menuname)
    this.props.interScroll(gRef, 2000)
    this.setState({ mobileOpen: false })
  }
  toggleMobileMenu() {
    this.setState({
      mobileOpen: !this.state.mobileOpen,
    })
  }
  render() {
    let menu = this.props.data.home.frontmatter.components.sektioner.filter(
      e => e.menuname
    )

    let menuItem = menu.map((e, i) => {
      return (
        <Observer triggerOnce={false} threshold={0} key={`menuitem-${i}`}>
          {inView => (
            <MenuLi tDelay={i * 0.1} show={inView}>
              <Link
                to={`/`}
                onClick={event => {
                  this.setState({ mobileOpen: false })
                  this.props.interScroll(event, slug(e.menuname))
                }}
              >
                {e.menuname}
              </Link>
            </MenuLi>
          )}
        </Observer>
      )
    })
    return (
      <div>
        <Navigation
          solidMenu={this.state.solidMenu}
          showMenu={this.props.showMenu}
          className={this.state.mobileOpen ? 'open' : ''}
        >
          <BurgerMenu
            className={this.state.mobileOpen ? 'open' : ''}
            onClick={this.toggleMobileMenu.bind(this)}
          >
            <span />
            <span />
            <span />
          </BurgerMenu>
          <ul>
            {menuItem}
            <Observer triggerOnce={false} key={`menuitem-showroom`}>
              {inView => (
                <MenuLi tDelay={menu.length * 0.1} show={inView} threshold={1}>
                  <Link
                    to={`/showroom`}
                    onClick={() => {
                      this.setState({ mobileOpen: false })
                    }}
                  >
                    Showroom
                  </Link>
                </MenuLi>
              )}
            </Observer>
          </ul>
          <div className="logo">
            <img src="/img/cap-leasing-logo.svg" />
          </div>
        </Navigation>
      </div>
    )
  }
}

export default Menu
