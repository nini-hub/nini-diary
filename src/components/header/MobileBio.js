import React from "react"

import "./header.css"
import xiaoxin from "../../images/xiaoxin.jpg"

const MobileBio = props => {
  return (
    <div className="mobile-bio-main">
      <img
        src={xiaoxin}
        className="ml-4 mt-2"
        style={{
          maxWidth: `75px`,
          maxHeight: `75px`,
          borderRadius: `50%`,
          boxShadow: `1px 1px 3px`,
        }}
        alt="author-pic"
      />
      <div>
        <h4 className="mr-4 mt-4">{props.author}</h4>
        <small className="text-muted">{props.tagline}</small>
      </div>
    </div>
  )
}

export default MobileBio
