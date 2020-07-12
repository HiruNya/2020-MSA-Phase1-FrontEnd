import {Button, Chip, Grid, IconButton, InputAdornment, MenuItem, TextField, Typography} from "@material-ui/core"
import Search from "@material-ui/icons/Search"
import {Add} from "@material-ui/icons"
import React, {useState} from "react"
import {GENRES} from "./api"

type SearchFunction = (query: string, genres: string[]) => void

function SearchBar(props: {searchFunction: SearchFunction}): React.ReactElement {
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set())
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null)
  const [searchText, setSearchText] = useState("")

  function onClick(): void {
    props.searchFunction(searchText, Array.from(selectedGenres))
  }

  function onGenreSelect(): void {
    if (selectedGenre != null) {
      const newSet = new Set(selectedGenres)
      newSet.add(selectedGenre)
      setSelectedGenres(newSet)
      setSelectedGenre(null)
    }
  }

  return (
    <Grid container direction="column" spacing={1}>
      <Grid container item direction="row" alignItems={"center"}>
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
            variant="outlined"
          />
        </Grid>
        <Grid item xs={1}>
          <Button variant="contained" color="primary" onClick={onClick} >Search</Button>
        </Grid>
      </Grid>
      <Grid container item direction="row" alignItems={"center"} spacing={1}>
        <Grid item>
          <Typography variant="body1">
            Add Genre:
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            value={selectedGenre}
            onChange={event => setSelectedGenre(event.target.value)}
            select
            variant="outlined"
          >
            {GENRES
              .filter(g => !selectedGenres.has(g))
              .map(g => (<MenuItem key={g} value={g}>{g}</MenuItem>))}
          </TextField>
        </Grid>
        <Grid item>
          <IconButton color="secondary" onClick={onGenreSelect}><Add /></IconButton>
        </Grid>
        <Grid item xs>
          <div className={"tagList"}>
            { Array.from(selectedGenres.values())
              .map(g => <Chip label={g} />) }
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default SearchBar;
