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
      <header className="head-main primary-bgc px-2 d-lg-block d-none">
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
          <div>
            <Link
              to="/search"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              <i className="iconfont icon-sousuo" style={{ fontSize: 28 }}></i>
            </Link>

            <SocialLinks contacts={contacts} />
          </div>
        </div>
      </header>
      <header className="row justify-content-between m-0 primary-bgc py-1 px-1 d-lg-none">
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <img
            src={xiaoxin}
            className="d-inline-block m-0 mr-2 d-lg-none"
            style={{
              maxWidth: `45px`,
              maxHeight: `45px`,
            }}
            alt="author-pic"
          />
        </Link>
        <div className="herder-name">
          <h1 className="mb-1">{siteTitle}</h1>
          <h6 className="m-0 d-lg-none">{author}</h6>
        </div>
        <div style={{ lineHeight: "60px" }}>
          <Link
            to="/search"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            <i className="iconfont icon-sousuo" style={{ fontSize: 28 }}></i>
          </Link>

          <SocialLinks contacts={contacts} />
        </div>
        {/* </div> */}
        {/* <MobilePageLinks /> */}
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
