import React from 'react'
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import { debounce } from 'throttle-debounce'
import Button from '@material-ui/core/Button';
import {MDBContainer, MDBRow, MDBCol, MDBBadge} from "mdbreact";

import '../css/autocomplete.css'
import AlignItemsList from "./Listing";

const locations = [
    {
        name: 'Boulder, Colorado',
        lat: 40.0150,
        long: -105.2705
    },
    {
        name: 'Las Vegas, Nevada',
        lat: 36.1699,
        long: -115.1398
    },
];

const getLocationSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : locations.filter(loc =>
        loc.name.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getLocationSuggestionValue = suggestion => suggestion.name;

const renderLocationSuggestion = suggestion => (
    <div className="result">
        {suggestion.name}
    </div>
);


class AutoComplete extends React.Component {
    state = {
        queryValue: '',
        locationValue: '',
        suggestions: [],
        locations: [],
        response: ""
    };

    componentWillMount() {
        this.onSuggestionsFetchRequested = debounce(
            500,
            this.onSuggestionsFetchRequested
        )
        this.onLocationSuggestionsFetchRequested = debounce(
            500,
            this.onLocationSuggestionsFetchRequested
        )
    }

    onLocationChange = (event, { newValue }) => {
        this.setState({
            locationValue: newValue
        });
    };

    onLocationSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            locations: getLocationSuggestions(value)
        });
    };

    onLocationSuggestionsClearRequested = () => {
        this.setState({
            locations: []
        });
    };

    renderSuggestion = suggestion => {
        return (
            <div className="result">
                <div>{suggestion.name}</div>
            </div>
        )
    };

    onChange = (event, { newValue }) => {
        this.setState({ queryValue: newValue })
    };


    config = {
        headers: { Authorization: `Bearer ${'search-wjvmi2deimj35bjhyedbpiac'}` }
    };

    onSuggestionsFetchRequested = ({ value }) => {
        axios
            .post('https://8c3f927e06874e2990808e9b6c03f56c.app-search.us-west1.gcp.cloud.es.io/api/as/v1/engines/restaurant-search-query/query_suggestion',
                {query: value, types: {documents: {fields: ["text"]}}, size: 10}, this.config
            )
            .then(res => {

                const result = res.data.results.documents.map(
                    suggestion => ({
                            name: suggestion.suggestion
                        })
                );
                console.log(result);
                this.setState({ suggestions: result });
                console.log(this.state.suggestions)
            })
    };

    onSuggestionsClearRequested = () => {
        this.setState({ suggestions: [] })
    };

    handleButtonClick = () => {
        this.props.handleButtonClick();
        let lat, long;
        for (const [index, location] of locations.entries()) {
            if(this.state.locationValue===location.name)
            {
                lat = location.lat;
                long = location.long;
            }

        }
        axios.get('http://104.198.7.64/dashboard', {
            params: {
                word: this.state.queryValue,
                lat: lat,
                long: long
            }
        })
            .then((res) => {
                console.log(res)
                this.setState({response: res})
                this.props.onDataReceived(this.state.response, lat, long);
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .finally(() => {
                // always executed
            });

    }

    render() {
        const { queryValue, locationValue, suggestions, locations } = this.state;

        const inputProps = {
            placeholder: 'Enter a search query...',
            value: queryValue,
            onChange: this.onChange
        };

        const inputPropsLocation = {
            placeholder: 'Enter a location...',
            value: locationValue,
            onChange: this.onLocationChange
        };

        return (
            <div className="autocomplete-container">
                <MDBRow style={{marginRight: '0px', marginLeft: '0px' }}>
                    <MDBCol size="7" style={{padding: '10px 0px 0px 10px', margin: '0px'  }}>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={suggestion => suggestion.name}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}/>
                    </MDBCol>
                    <MDBCol size="3" style={{padding: '10px 5px 0px 0px', margin: '0px' }}>
                        <Autosuggest
                            suggestions={locations}
                            onSuggestionsFetchRequested={this.onLocationSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onLocationSuggestionsClearRequested}
                            getSuggestionValue={suggestion => suggestion.name}
                            renderSuggestion={renderLocationSuggestion}
                            inputProps={inputPropsLocation}/>
                    </MDBCol>
                    <MDBCol size="2" style={{padding: '20px 20px 0px 10px' }}>
                            <Button className="search-button-search" variant="outlined" size="large" color="primary" onClick={this.handleButtonClick}>Search</Button>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default AutoComplete;