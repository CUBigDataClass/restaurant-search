import React from 'react'
import ReactDOM from 'react-dom'
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import { debounce } from 'throttle-debounce'
import Button from '@material-ui/core/Button';

import '../css/autocomplete.css'

class AutoComplete extends React.Component {
    state = {
        value: '',
        suggestions: [],
        response: ""
    };

    componentWillMount() {
        this.onSuggestionsFetchRequested = debounce(
            500,
            this.onSuggestionsFetchRequested
        )
    }

    renderSuggestion = suggestion => {
        return (
            <div className="result">
                <div>{suggestion.name}</div>
            </div>
        )
    };

    onChange = (event, { newValue }) => {
        this.setState({ value: newValue })
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
        axios.get('http://localhost:5000/dashboard', {
            params: {
                word: this.state.value,
                lat: this.props.lat,
                long: this.props.long
            }
        })
            .then((res) => {
                console.log(res)
                this.setState({response: res})
                this.props.onDataReceived(this.state.response);
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
        const { value, suggestions } = this.state;

        const inputProps = {
            placeholder: 'Enter a search query...',
            value,
            onChange: this.onChange
        };

        return (
            <div className="autocomplete-container">
                <Autosuggest
                    className="search-query-suggestion-input"
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={suggestion => suggestion.name}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}/>

                <div className="search-button-container">
                    <Button className="search-button-query" variant="outlined" size="large" color="primary">Get Location</Button>
                    <Button className="search-button-search" variant="outlined" size="large" color="primary" onClick={this.handleButtonClick}>Search</Button>
                </div>
            </div>
        )
    }
}

export default AutoComplete;