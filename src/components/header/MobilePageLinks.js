import React from "react"
import { Link } from "gatsby"

const MobilePages = () => {
<<<<<<< HEAD
    return (
        <div className="mobile-pages-main">
            <div className="text-center">
                <p className="d-inline p-4"><Link to="/"><span className="text-dark">Blog Home</span></Link></p>
                <p className="d-inline p-4"><Link to="/about"><span className="text-dark">About</span></Link></p>
                <p className="d-inline p-4"><Link to="/archive"><span className="text-dark">Archive</span></Link></p>
            </div>
        </div>
    )
}

export default MobilePages


=======
  return (
    <div className="mobile-pages-main">
      <div className="text-center">
        <p className="d-inline p-4">
          <Link to="/">
            <span className="text-dark">Blog Home</span>
          </Link>
        </p>
        <p className="d-inline p-4">
          <Link to="/about">
            <span className="text-dark">About</span>
          </Link>
        </p>
        <p className="d-inline p-4">
          <Link to="/archive">
            <span className="text-dark">Archive</span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export default MobilePages
>>>>>>> b4e9f4f3f2bab76c3873d6a12b5a890c982f02d8
