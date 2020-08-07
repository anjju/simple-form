import React from 'react';
import {
    Link
} from "react-router-dom";
function Home (props) {
  return (
    <div className="App">
      <Link to="/register"><button type="button" className="reg-btn">Register</button></Link>
    </div>
  );
}

export default Home;