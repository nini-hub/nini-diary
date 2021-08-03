import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

import MobilePageLinks from "./MobilePageLinks"
import SocialLinks from "./SocialLinks"
import "./header.css"
import xiaoxin from "@/images/xiaoxin.jpg"

const Header = ({ siteTitle, tagline, author, contacts }) => {
  return (
    <>
      <header className="head-main primary-bgc px-2 d-sm-block d-none ">
        <div
          className="container row  justify-content-between"
          style={{ margin: "0 auto" }}
        >
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
          <SocialLinks contacts={contacts} />
        </div>
      </header>
      <header className="head-main container row justify-content-between m-0 primary-bgc py-1 d-sm-none">
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <img
            src={xiaoxin}
            className="d-md-none d-inline-block m-0 mr-2"
            style={{
              maxWidth: `45px`,
              maxHeight: `45px`,
            }}
            alt="author-pic"
          />
        </Link>
        <div className="herder-name">
          <h1 className="mb-1">{siteTitle}</h1>
          <h6 className="m-0 d-md-none">{author}</h6>
        </div>
        <SocialLinks contacts={contacts} />
        {/* </div> */}
        <MobilePageLinks />
      </header>
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
