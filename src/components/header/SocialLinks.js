import React from "react"

const SocialLinks = ({ contacts }) => {
  return (
    <div className="social-links float-right">
      <a className="text-light ml-4" href={contacts.github}>
        <span title="GitHub">
          <i className="iconfont  icon-github" style={{ fontSize: 28 }}></i>
        </span>
      </a>
    </div>
  )
}

export default SocialLinks
