import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <p className="">Page Not Found</p>
      <Link to="/">to home page</Link>
    </div>
  );
}

export default PageNotFound;
