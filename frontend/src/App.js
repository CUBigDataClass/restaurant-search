import React from "react";

import AutoComplete from "./components/js/AutoComplete";
import AlignItemsList from "./components/js/Listing";
import RecipeReviewCard from "./components/js/Details";
import SimpleCard from "./components/js/Map";
import "@elastic/react-search-ui-views/lib/styles/styles.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

export default function App() {
  return (
    <div>
      <AutoComplete />
      <MDBRow>
        <MDBCol size="3"><AlignItemsList /></MDBCol>
        <MDBCol size="4"><RecipeReviewCard/></MDBCol>
        <MDBCol size="5"><SimpleCard/></MDBCol>
      </MDBRow>
    </div>
  );
}
