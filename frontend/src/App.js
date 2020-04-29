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
import LoadingDialog from "./components/js/LoadingDialog";
import logo from "./components/assets/logo.png"

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
      selectedlat: 0,
      selectedLong: 0,
      buttonClicked: false,
      isfetching: false
    }
  }

  onDataReceived = (response, lat, long) => {
    this.setState({response: response, selectedlat: lat, selectedlong: long, isfetching: false})

  };

  handleButtonClick = () => {
      this.setState({buttonClicked: true, isfetching: true})
  };

  render() {
    return (
      <div>
          <LoadingDialog isfetching={this.state.isfetching}/>
          <MDBRow style={{marginRight: '15px', marginLeft: '15px', display: 'flex',
              justifyContent: 'center' }}>
              <img src={logo} style={{height: '70px'}}/>
          </MDBRow>
          <div>

              <AutoComplete onDataReceived={this.onDataReceived} handleButtonClick={this.handleButtonClick}/>

              { this.state.buttonClicked ? <div>
                  <MDBRow style={{marginRight: '30px', marginLeft: '15px'}}>
                      <Grow
                          in={this.state.buttonClicked}>
                          <MDBCol size="3" style={{padding: '0px 0px 0px 10px', margin: '0px'  }}><AlignItemsList rest_list={this.state.response} onClick={(current_rest) => {
                              // this.setState({index:index})
                              let categories;
                              (typeof current_rest.bcategories === 'string' ) ? categories= current_rest.bcategories.split(',') :  categories= current_rest.bcategories;
                              this.setState({ bid: current_rest.bid,
                              bname: current_rest.bname ,
                              baddress: current_rest.baddress,
                              bcategories: categories,
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
                          <MDBCol size="5" style={{padding: '0px 0px 0px 10px', margin: '0px'  }}><RecipeReviewCard bid= {this.state.bid} bname= {this.state.bname}
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
                          <MDBCol size="4" style={{padding: '0px 0px 0px 10px', marginRight: '0px'  }}><SimpleCard selectedlat={this.state.selectedlat} selectedlong={this.state.selectedlong} lat={this.state.blocation.split(',')[0]} lng={this.state.blocation.split(',')[1]}/></MDBCol>
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