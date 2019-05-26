import React from "react";
import {Button} from "@material-ui/core";
import ImportFromFileBodyComponent from "../src/ImportFromFileBodyComponent";
import Typography from "@material-ui/core/Typography";
import ResultsList from "../src/ResultsList";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SaveAlt from '@material-ui/icons/SaveAlt';
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { withStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import {formatPredictions} from "../src/utils";
import {sortResults} from "../src/utils";

const styles = theme => ({
  submitButton: {
    marginTop: "10px",
  },
  panel: {
    marginTop: "20px",
  },
  downloadButton: {
    marginLeft: "60px",
  },
  icon: {
    marginLeft: "5px",
    fontSize: "16px"
  }
});

class ArrayTextsPage extends React.Component {
  state = {
    canClassify: false,
    texts: []
  }

  handleFileRead = fileReader => e => {
    const texts = fileReader.result.split('\n')
    this.setState({ texts,  canClassify: true })
  };

  onClassifyArray = e => {
    fetch('http://35.241.250.29:9000/get_predictions_array', {
      method: "POST",
      body: JSON.stringify({ texts: this.state.texts }),
      headers: {
        "Content-Type": "application/json",

      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        return data.predictions.map(p => formatPredictions(p))
      })
      .then(formattedData => this.groupByClass(formattedData))
      .then(groupedData => this.setState({ predictionsGroupedByClass: groupedData }))
  }

  groupByClass = data => {
    let groups = {};
    data.map((predictions, i) => {
      const maxResult =  Math.max.apply(Math, predictions.map(p => p.result))
      const pred = predictions.find(p => p.result === maxResult )
      const result = {
        text: this.state.texts[i],
        mainClass: pred.name,
        predictions
      }
      groups[result.mainClass] ? groups[result.mainClass] = [...groups[result.mainClass], result] : groups[result.mainClass] = [result]
    })
    return groups
  }

  download = predictions => () => {
    const fileName = `${predictions[0]}.txt`
    const text = predictions[1].map(i => i.text).join("\n")
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', fileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
          <ImportFromFileBodyComponent handleFileRead={this.handleFileRead}/>
          {this.state.canClassify &&
            <Button
                variant="contained"
                color="primary"
                onClick={this.onClassifyArray}
                className={classes.submitButton}
            >
                Classify
              </Button>
          }
        {!this.state.predictionsGroupedByClass ? null :
          Object.entries(this.state.predictionsGroupedByClass).map((predictions, i) => {
            return (
                <ExpansionPanel className={classes.panel} key={i}>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Grid container alignItems={"center"} justify={"space-between"}>
                      <Typography variant={"subtitle2"}>{predictions[0].toUpperCase()}</Typography>
                      <Button
                        color={"primary"}
                        size={"small"}
                        className={classes.downloadButton}
                        onClick={this.download(predictions)}
                      >
                        Download
                        <SaveAlt className={classes.icon}/>
                      </Button>
                    </Grid>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Grid container spacing={16}>
                    {predictions[1].map((p, index) => (
                        <Grid item i={index}  md={4} lg={4} xs={4}>
                            <Card>
                              <CardContent>
                                <Typography key={index}>{p.text}</Typography>
                                <ResultsList predictions={sortResults(p.predictions)} title={''}/>
                              </CardContent>
                            </Card>
                        </Grid>
                    ))}
                    </Grid>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
            )
          })
        }
      </React.Fragment>
    );
  }
};

export default withStyles(styles)(ArrayTextsPage)