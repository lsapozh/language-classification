import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import ResultsList from "../src/ResultsList";
import SearchForm from "../src/SearchForm";
import {formatPredictions} from "../src/utils";
import {sortResults} from "../src/utils";


class TextPage extends Component {
  state = {
    text: '',
  }

  handleChange = event => {
    this.setState({
      text: event.target.value,
    });
  };

  clearTextField = () => {
    this.setState({
      text: '',
      predictions: null
    })
  }

  onClassify = () => {
    // this.setState({ predictions: formatPredictions({ "policy": 0.3, "world": 0.5, "economy": 0.1, "saddssdsds": 0.1})})
    fetch('http://35.241.250.29:9000/get_predictions', {
      method: "POST",
      body: JSON.stringify({ text: this.state.text }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(response => response.json())
      .then(data => formatPredictions(data.predictions))
      .then(formattedData => this.setState({ predictions: formattedData }))
  }

  render() {
    return (
          <Grid container direction="row">
            <SearchForm
              text={this.state.text}
              handleChange={this.handleChange}
              clearTextField={this.clearTextField}
              onClassify={this.onClassify}
            />
            {this.state.predictions ? <ResultsList predictions={sortResults(this.state.predictions)}/> : null}
          </Grid>
    );
  }
}

export default TextPage;
