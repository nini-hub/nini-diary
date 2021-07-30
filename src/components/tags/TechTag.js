import React from "react"

import "./tags.css"
import { Link } from "gatsby"

const TechTag = props => {
  const { tag, tech, name } = props

  return (
    <div className="d-inline-block p-1">
      <Link to={`/tags/${tech}/`}>
        <button className="tech-tag text-white">
          <p className="d-inline">{tag} </p>
          <img
            src={require(`../../images/icons/${name}`)}
            style={{ width: 18, margin: 0 }}
            alt=""
          />
        </button>
      </Link>
    </div>
  )
}

export default TechTag
