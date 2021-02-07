import React, { Component } from "react";
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import image from './imageshop.jpg';

class Home extends Component {
  render() {
    return (
     <div className="container">
      <h1 className="head">Freeway</h1>
      <div className="row sub-head">
        <div className="col-md-8">
          <h4 className="content1">Freeway is an Online platform for <strong>Shopping</strong>. It allows people to buy hassle-free products</h4>
          <h3 className="content2">We ensure safe delivery </h3>
        </div>
      </div>
      <div className="row exp-req-btns">
        {/* <div className="col-md-6 exp-btn">
          <Link to={`/explore`}>
            <Button color="danger" className="exp-btn1">Explore</Button>
          </Link>
        </div> */}
        <div className="col-md-6 eq-btn">
          <Link to={`/request`}>
            <Button color="danger" className="req-btn1">Register</Button>
          </Link>
        </div>
      </div>
      <div className="image">
        <img width="100%" src={image}></img>
      </div>
     </div>
    );
  }
}

export default Home;