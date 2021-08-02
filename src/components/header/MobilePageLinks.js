import React from "react"
import { Link } from "gatsby"

const MobilePages = () => {
  return (
    <div className="mobile-pages-main">
      <div className="text-center">
        <p className="d-inline p-4">
          <Link to="/">
            <svg className="icon">
              <use href={`#icon-tubiaozhizuomobanyihuifu-`}></use>
            </svg>
            <span className="text-dark">主页</span>
          </Link>
        </p>
        <p className="d-inline p-4">
          <Link to="/about">
            <svg className="icon">
              <use href={`#icon-guanyuwomen`}></use>
            </svg>
            <span className="text-dark">关于我</span>
          </Link>
        </p>
        <p className="d-inline p-4">
          <Link to="/archive">
            <svg className="icon">
              <use href={`#icon-icon_A`}></use>
            </svg>

            <span className="text-dark">文章</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default MobilePages
