import Grid from "@material-ui/core/Grid/Grid";
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button/Button";
import React from "react";

const SearchForm = ({ text, handleChange, clearTextField, onClassify }) => (
  <Grid item>
    <Grid container direction="column">
      <Grid item>
        <TextField
          style={{margin: "0 30px 30px 0", width: "40vw"}}
          id="text-field"
          label="Text For Classification"
          multiline
          rowsMax="10"
          rows="5"
          value={text}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" onClick={clearTextField} style={{marginRight: 20}}>
          Clear
        </Button>
        <Button variant="contained" color="primary" onClick={onClassify}>
          Classify
        </Button>
      </Grid>
    </Grid>
  </Grid>
)

export default SearchForm