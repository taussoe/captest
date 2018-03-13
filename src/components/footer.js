import React from 'react'
import styled from 'styled-components'
import TextBlock from '../components/textblock'
import Link from 'gatsby-link'
import slug from 'slug'

const FooterContainer = styled.footer`
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  background-color: #f7f7f7;
  padding-top: 100px;
  padding-bottom: 50px;
  .email-input {
    margin-top: 40px;
    border: 1px solid #000000;
    padding: 10px 15px;
    display: inline-block;
    .email-signup {
      background-color: transparent;
      border: 0px;
      font-size: 16px;
      width: 310px;
    }
    button {
      border: 0px;
      background-color: transparent;
      color: #000000;
      font-size: 16px;
      font-weight: 100;
    }
  }
  .social-link {
    text-decoration: none;
    margin: 5px;
    img {
      width: 23px;
    }
  }
  .padding {
    padding: 70px 10px 10px 10px;
  }
  ul {
    list-style: none;
    margin: 0px;
    padding: 0px;
    li {
      a {
        text-decoration: none;
        color: #000000;
      }
    }
  }
`


export default props => (
  <FooterContainer>
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-sm-12 col-xs-12 hidden-sm hidden-xs">
          <div className="text">
            <b>Nyhedsbrev</b> <br />
            <br />
            Skriv dig op til vores nyhedsbrev og modtag gode tilbud<br /> på
            luksus leasing biler
          </div>
          <div className="email-input">
            <input
              type="text"
              className="email-signup"
              placeholder="Indtast email..."
            />
            <button>Tilmeld</button>
          </div>
        </div>
        <div className="col-md-3 col-sm-12 col-xs-12 hidden-sm hidden-xs">
          <b>Links</b>
          <br />
          <br />
          <ul>
            {props.data.home.frontmatter.components.sektioner
              .filter(e => e.menuname)
              .map((menuitem, i) => (
                <li key={`footer-link-${i}`}>
                  <Link
                    to={`/`}
                    onClick={event => {

                      props.interScroll(event, slug(menuitem.menuname))
                    }}
                  >
                    {menuitem.menuname}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-3 col-sm-12 col-xs-12 center">
          <b>Kontakt</b>
          <br />
          <br />
          Kattegatvej 39 <br />
          2150 Nordhavn<br />
          CVR. 33588666<br />
          info@capleasing.dk
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12 center padding">
          <a href="#" target="_blank" className="social-link">
            <img src="/img/instagram.png" alt="Instagram" />
          </a>
          <a href="#" target="_blank" className="social-link">
            <img src="/img/linkedin.png" alt="LinkedIn" />
          </a>
          <a href="#" target="_blank" className="social-link">
            <img src="/img/facebook.png" alt="Facebook" />
          </a>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-sm-12 col-xs-12 center">
          &copy; Copyright 2015, Cap Leasing
        </div>
      </div>
    </div>
  </FooterContainer>
)
