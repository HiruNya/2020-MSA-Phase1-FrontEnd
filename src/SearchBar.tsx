import {Button, Chip, IconButton, InputAdornment, MenuItem, TextField, Typography} from "@material-ui/core"
import Search from "@material-ui/icons/Search"
import {Add} from "@material-ui/icons"
import React, {useState} from "react"
import {GENRES} from "./api"
import "./SearchBar.css"

type SearchFunction = (query: string, genres: string[]) => void

function SearchBar(props: {searchFunction: SearchFunction}): React.ReactElement {
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(new Set())
  const [selectedGenre, setSelectedGenre] = useState<string | null>(GENRES[0])
  const [searchText, setSearchText] = useState("")

  function onClick(): void {
    props.searchFunction(searchText, Array.from(selectedGenres))
  }

  if (selectedGenre == null) {
    const genre = GENRES.filter(g => !selectedGenres.has(g))[0]
    setSelectedGenre((genre)? genre: "")
  }

  function onGenreSelect(): void {
    if (selectedGenre != null) {
      const newSet = new Set(selectedGenres)
      newSet.add(selectedGenre)
      setSelectedGenres(newSet)
      setSelectedGenre(null)
    }
  }

  function onGenreRemove(g: string): () => void {
    return () => {
      setSelectedGenres((oldGenres) => {
        const genres = new Set(oldGenres)
        genres.delete(g)
        return genres
      })
    }
  }

  return (
    <div className="container" style={{flexDirection: "column"}}>
      <div className="container search-row wrap expand-when-small">
        <div className="space fill">
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
            placeholder={"Pokemon, Naruto, etc."}
            className="search-row"
            variant="outlined"
          />
        </div>
        <div className="space expand-when-small">
          <Button variant="contained" color="primary" onClick={onClick} className="expand-when-small">Search</Button>
        </div>
      </div>
      <div className="container search-row space fill wrap">
        <div className="container expand-when-small">
          <div>
            <Typography variant="body1">
              Add Genre:
            </Typography>
          </div>
          <div className="space fill">
            <TextField
              value={selectedGenre}
              onChange={event => setSelectedGenre(event.target.value)}
              select
              disabled={selectedGenre === ""}
              variant="outlined"
              style={{width: "100%"}}
            >
              {GENRES
                .filter(g => !selectedGenres.has(g))
                .map(g => (<MenuItem key={g} value={g}>{g}</MenuItem>))}
            </TextField>
          </div>
          <div>
            <IconButton color="secondary" onClick={onGenreSelect}><Add /></IconButton>
          </div>
        </div>
        <div className="fill expand-when-small space">
          <div className={"tag-list"}>
            { Array.from(selectedGenres.values())
              .map(g => <Chip label={g} onDelete={onGenreRemove(g)} key={g} />) }
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchBar;
