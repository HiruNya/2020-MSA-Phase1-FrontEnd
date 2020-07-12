import React, {useState} from 'react'
import './App.css'
import {Container, Grid} from "@material-ui/core"
import SearchBar from "./SearchBar"
import AnimeGrid from "./AnimeGrid"
import {AnimeEntry, search} from "./api"

function App() {
  const [anime, setAnime] = useState<AnimeEntry[]>([])

  function searchAnime(query: string, genres: string[]) {
    search(query, genres)
      .then(json => setAnime(json))
  }

  return (
    <div className="App">
      <Container maxWidth="lg">
        <Grid direction={"column"} spacing={5} container>
          <Grid item xs>
            <SearchBar searchFunction={searchAnime} />
          </Grid>
          <Grid item xs>
            <AnimeGrid anime={anime} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default App
