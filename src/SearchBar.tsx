import {Button, Grid, InputAdornment, TextField} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import React from "react";

function SearchBar(): React.ReactElement {
  return (
    <Grid container direction="row" alignItems={"center"}>
      <Grid item xs>
        <TextField
          label={"Search"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search/>
              </InputAdornment>
            )
          }}
          placeholder={"Pokemon, Naruto, Dragon Ball Z, etc."}
          style={{width: "100%"}}
        />
      </Grid>
      <Grid item xs={1}>
        <Button variant="contained" color="primary">Search</Button>
      </Grid>
    </Grid>
  )
}

export default SearchBar;
