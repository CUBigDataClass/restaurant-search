import React from "react";

import AutoComplete from "./components/js/AutoComplete";
import AlignItemsList from "./components/js/Listing";
import RecipeReviewCard from "./components/js/Details";
import SimpleCard from "./components/js/Map";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { geolocated } from "react-geolocated";
import Slide from "@material-ui/core/Slide";
import Grow from '@material-ui/core/Grow';
import ScrollParallex from "./components/js/ScrollParallax";
import Fade from "@material-ui/core/Fade";
import NavBar from "./components/js/NavBar";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bid: '',
      bname: '',
      baddress: '',
      bcategories: '',
      bcity: '',
      blocation: '47.69855629475769,-122.14184416996333',
      brating: '',
      breview_count: '',
      btop_10: '',
      response: '',
      buttonClicked: false
    }
  }

  onDataReceived = (response) => {
    this.setState({response: response})
  };

  handleButtonClick = () => {
      this.setState({buttonClicked: true})
  };

  render() {
    return (
      <div>
          <NavBar/>
        {/*{this.props.coords}*/}
          <div>

              <AutoComplete onDataReceived={this.onDataReceived} handleButtonClick={this.handleButtonClick}/>

              { this.state.buttonClicked ? <div>
                  <MDBRow style={{marginRight: '15px', marginLeft: '15px' }}>
                      <Grow
                          in={this.state.buttonClicked}>
                          <MDBCol size="3"><AlignItemsList rest_list={this.state.response} onClick={(current_rest) => {
                              // this.setState({index:index})
                              this.setState({ bid: current_rest.bid,
                              bname: current_rest.bname ,
                              baddress: current_rest.baddress,
                              bcategories: current_rest.bcategories,
                              bcity: current_rest.bcity,
                              blocation: current_rest.blocation,
                              brating: current_rest.brating,
                              breview_count: current_rest.breview_count,
                              btop_10: current_rest.btop_10})
                              console.log(current_rest)
                          }} />
                          </MDBCol>
                      </Grow>
                      <Grow
                          in={this.state.buttonClicked}
                          style={{ transformOrigin: '0 0 0' }}
                          {...(this.state.buttonClicked ? { timeout: 1000 } : {})}
                      >
                          <MDBCol size="5"><RecipeReviewCard bid= {this.state.bid} bname= {this.state.bname}
                              baddress= {this.state.baddress}
                              bcategories= {this.state.bcategories}
                              bcity= {this.state.bcity}
                              blocation= {this.state.blocation}
                              brating= {this.state.brating}
                              breview_count= {this.state.breview_count}
                              btop_10= {this.state.btop_10}/></MDBCol>
                          {/* <MDBCol size="5"></MDBCol> */}
                      </Grow>

                      <Grow
                          in={this.state.buttonClicked}
                          style={{ transformOrigin: '0 0 0' }}
                          {...(this.state.buttonClicked ? { timeout: 2000 } : {})}
                      >
                          <MDBCol size="4"><SimpleCard centreLat={} centeLong={} lat={this.state.blocation.split(',')[0]} lng={this.state.blocation.split(',')[1]}/></MDBCol>
                          {/* <MDBCol size="4"></MDBCol> */}
                      </Grow>

                  </MDBRow>
              </div> : <Fade in={!this.state.buttonClicked}><ScrollParallex/></Fade> }


          </div>
      </div>
    );
  }
}


export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(App);