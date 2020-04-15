import React from "react";

import AutoComplete from "./components/js/AutoComplete";
import AlignItemsList, { rest_list } from "./components/js/Listing";
import RecipeReviewCard from "./components/js/Details";
import SimpleCard from "./components/js/Map";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    }
  }

  render() {
    return (
      <div>
        <AutoComplete />
        <MDBRow>
          <MDBCol size="3"><AlignItemsList onClick={(index) => {
            console.log(index)
            this.setState({index:index})
          }} /></MDBCol>
          <MDBCol size="4"><RecipeReviewCard index={this.state.index}/></MDBCol>
          <MDBCol size="5"><SimpleCard/></MDBCol>
        </MDBRow>
      </div>
    );
  }
}

export default App;
