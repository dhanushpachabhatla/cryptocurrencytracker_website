import React from "react";
import "./styles.css";

function NewsHeading() {
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div className="container-heading">
      <h2 className="heading" >
        Latest Crypto News<span>.</span>
      </h2>
    </div>
  );
}

export default NewsHeading;
