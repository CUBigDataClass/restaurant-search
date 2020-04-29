import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  maxHeight: '80vh'
};

export class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: {lat: this.props.lat, lng: this.props.lng}
    }
  }

  displayMarkers = () => {
      return <Marker id={0} position={{
       lat: this.state.store.lat,
       lng: this.state.store.lng
     }}
     onClick={() => console.log("You clicked me!")} />
  }


  componentDidUpdate(prevProps) {
    if (prevProps.lat !== this.props.lat && prevProps.lng !== this.props.lng) {
      this.setState({
        store: {lat: this.props.lat, lng: this.props.lng}
      })
    }
  }

  render() {

    return (
        <Map
          google={this.props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        >
          {this.displayMarkers()}
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR_API_KEY'
})(MapContainer);
