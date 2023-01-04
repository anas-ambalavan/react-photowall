import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <center>
      <p className="">Page Not Found</p>
      <Link to="/">to home page</Link>
    </center>
  );
}

export default PageNotFound;
