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
      store: {lat: this.props.lat, lng: this.props.lng},
      latitude: this.props.selectedlat,
      longitude: this.props.selectedlong
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
        store: {lat: this.props.lat, lng: this.props.lng},
          latitude: this.props.selectedlat,
          longitude: this.props.selectedlong
      })
    }
  }

  render() {

      console.log(this.state.latitude);
      console.log(this.state.longitude);

    return (
        <Map
          google={this.props.google}
          zoom={11}
          style={mapStyles}
          center={{
              lat: this.state.latitude,
              lng: this.state.longitude
          }}
        >
          {this.displayMarkers()}
        </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'YOUR API KEY'
})(MapContainer);
