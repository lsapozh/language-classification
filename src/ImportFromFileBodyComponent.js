import React from "react";
import {Button, Typography} from "@material-ui/core";
import styled from 'styled-components'
import Grid from "@material-ui/core/Grid";

const FileInput = styled.input`
    position: relative;
    right: 185px;
    cursor: pointer;
    height: 36px;
    width: 117px;
    opacity: 0;
`

class ImportFromFileBodyComponent extends React.Component {
  state = {
    fileName: "No chosen",
  }

  handleFileChosen = e => {
    const file = e.target.files[0]
    const fileReader = new FileReader();
    fileReader.onloadend = this.props.handleFileRead(fileReader);
    fileReader.readAsText(file);
    this.setState({
      fileName: file.name
    })
  };

  render() {
    return (
      <React.Fragment>
            <Grid container item direction={"row"} alignItems={"center"} spacing={16}>
            <Grid item>
              <Button
              variant="contained"
              color="default"
              >
                Choose file
              </Button>
            </Grid>
            <Grid item><Typography><i>{this.state.fileName}</i></Typography></Grid>
              <FileInput type='file'
                   accept='.txt'
                   onChange={this.handleFileChosen}/>
      </Grid>
      </React.Fragment>
    );
  }
};

export default ImportFromFileBodyComponent