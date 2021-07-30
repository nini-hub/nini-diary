import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

<<<<<<< HEAD

=======
>>>>>>> b4e9f4f3f2bab76c3873d6a12b5a890c982f02d8
import MobileSocialLinks from "./MobileSocialLinks"
import MobilePageLinks from "./MobilePageLinks"
import SocialLinks from "./SocialLinks"
import MobileBio from "./MobileBio"
import "./header.css"

const Header = ({ siteTitle, tagline, author, contacts }) => {
<<<<<<< HEAD

=======
>>>>>>> b4e9f4f3f2bab76c3873d6a12b5a890c982f02d8
  return (
    <header
      className="head-main"
      style={{
<<<<<<< HEAD
        background: `black`
      }}
    >
      <div className="head-elements"
        style={{
          margin: `0`,
          padding: `.75rem`
=======
        background: `black`,
      }}
    >
      <div
        className="head-elements"
        style={{
          margin: `0`,
          padding: `.75rem`,
>>>>>>> b4e9f4f3f2bab76c3873d6a12b5a890c982f02d8
        }}
      >
        <h1 className="head-logo ml-4" style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <SocialLinks contacts={contacts} />
      </div>
      <MobileSocialLinks contacts={contacts} />
      <MobilePageLinks />
      <MobileBio author={author} />
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
