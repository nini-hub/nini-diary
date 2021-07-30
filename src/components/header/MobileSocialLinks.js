<<<<<<< HEAD
import React from "react";
import {
    FaLinkedin,
    FaGithubSquare,
    FaStackOverflow,
    FaFreeCodeCamp,
    FaTwitterSquare
=======
import React from "react"
import {
  FaLinkedin,
  FaGithubSquare,
  FaStackOverflow,
  FaFreeCodeCamp,
  FaTwitterSquare,
>>>>>>> b4e9f4f3f2bab76c3873d6a12b5a890c982f02d8
} from "react-icons/fa"

import "../layout.css"

const MobileSocialLinks = ({ contacts }) => {
<<<<<<< HEAD
    return (
        <div className="bottom-bar py-1">
            <a className=" text-primary"
                href={contacts.linkedin}>
                <span title="Linked In">
                    <FaLinkedin size={26} style={{ color: "primary" }} />
                </span>
            </a>
            <a className="text-light"
                href={contacts.github}>
                <span title="GitHub">
                    <FaGithubSquare size={26} style={{ color: "light" }} />
                </span>
            </a>
            <a className="text-warning"
                href={contacts.stackoverflow}>
                <span title="Stack Overflow">
                    <FaStackOverflow size={26} style={{ color: "warning" }} />
                </span>
            </a>
            <a className="text-success"
                href={contacts.freecodecamp}>
                <span title="freeCodeCamp">
                    <FaFreeCodeCamp size={26} style={{ color: "success" }} />
                </span>
            </a>
            <a className="text-info"
                href={contacts.twitter}>
                <span title="Twitter">
                    <FaTwitterSquare size={26} style={{ color: "info" }} />
                </span>
            </a>
        </div>
    )
}

export default MobileSocialLinks;
=======
  return (
    <div className="bottom-bar py-1">
      <a className=" text-primary" href={contacts.linkedin}>
        <span title="Linked In">
          <FaLinkedin size={26} style={{ color: "primary" }} />
        </span>
      </a>
      <a className="text-light" href={contacts.github}>
        <span title="GitHub">
          <FaGithubSquare size={26} style={{ color: "light" }} />
        </span>
      </a>
      <a className="text-warning" href={contacts.stackoverflow}>
        <span title="Stack Overflow">
          <FaStackOverflow size={26} style={{ color: "warning" }} />
        </span>
      </a>
      <a className="text-success" href={contacts.freecodecamp}>
        <span title="freeCodeCamp">
          <FaFreeCodeCamp size={26} style={{ color: "success" }} />
        </span>
      </a>
      <a className="text-info" href={contacts.twitter}>
        <span title="Twitter">
          <FaTwitterSquare size={26} style={{ color: "info" }} />
        </span>
      </a>
    </div>
  )
}

export default MobileSocialLinks
>>>>>>> b4e9f4f3f2bab76c3873d6a12b5a890c982f02d8
