import React from "react"
import { FaGithubSquare } from "react-icons/fa"

const SocialLinks = ({ contacts }) => {
  return (
    <div className="social-links float-right">
      <a className="text-light ml-4" href={contacts.github}>
        <span title="GitHub">
          <FaGithubSquare size={40} style={{ color: "light" }} />
        </span>
      </a>
    </div>
  )
}

export default SocialLinks
