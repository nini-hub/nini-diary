import React from "react"

import "./header.css"
import willjw3 from "../../images/willjw3.jpg"

<<<<<<< HEAD
const MobileBio = (props) => {

    return (
        <div className="mobile-bio-main">
            <img src={willjw3}  className="ml-4 mt-2" style={{ maxWidth: `75px`, maxHeight: `75px`, borderRadius: `50%`,boxShadow: `1px 1px 3px`}} alt="author-pic" />
            <h4 className="mr-4 mt-4">{props.author}</h4>
        </div>
    )
}

export default MobileBio
=======
const MobileBio = props => {
  return (
    <div className="mobile-bio-main">
      <img
        src={willjw3}
        className="ml-4 mt-2"
        style={{
          maxWidth: `75px`,
          maxHeight: `75px`,
          borderRadius: `50%`,
          boxShadow: `1px 1px 3px`,
        }}
        alt="author-pic"
      />
      <h4 className="mr-4 mt-4">{props.author}</h4>
    </div>
  )
}

export default MobileBio
>>>>>>> b4e9f4f3f2bab76c3873d6a12b5a890c982f02d8
