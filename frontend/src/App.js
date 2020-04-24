import React from "react";

import AutoComplete from "./components/js/AutoComplete";
import AlignItemsList, { rest_list } from "./components/js/Listing";
import RecipeReviewCard from "./components/js/Details";
import SimpleCard from "./components/js/Map";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { geolocated } from "react-geolocated";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      response: ''
    }
  }

  onDataReceived = (response) => {
    this.setState({response: response})
  };

  render() {
    return (
      <div>
        <AutoComplete onDataReceived={this.onDataReceived}/>
        <MDBRow style={{marginRight: '15px', marginLeft: '15px' }}>
          <MDBCol size="3"><AlignItemsList rest_list={this.state.response} onClick={(index) => {
            console.log(index)
            this.setState({index:index})
          }} /></MDBCol>
          <MDBCol size="4"><RecipeReviewCard index={this.state.index}/></MDBCol>
          <MDBCol size="5"><SimpleCard lat={rest_list[this.state.index].lat} lng={rest_list[this.state.index].lng}/></MDBCol>
        </MDBRow>
        {this.props.coords}
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