import {Button, Grid, InputAdornment, TextField} from "@material-ui/core";
import Search from "@material-ui/icons/Search";
import React, {useState} from "react";

type SearchFunction = (query: string) => void;

function SearchBar(props: {searchFunction: SearchFunction}): React.ReactElement {
  const [searchText, setSearchText] = useState("")

  function onClick(): void {
    props.searchFunction(searchText)
  }

  return (
    <Grid container direction="row" alignItems={"center"}>
      <Grid item xs>
        <TextField
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
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
        <Button variant="contained" color="primary" onClick={onClick} >Search</Button>
      </Grid>
    </Grid>
  )
}

export default SearchBar;
