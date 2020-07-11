import React from 'react'
import './App.css'
import {Container} from "@material-ui/core"
import SearchBar from "./SearchBar";
import AnimeGrid from "./AnimeGrid";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <SearchBar />
        <AnimeGrid anime={["Boku no Hero Acadamia", "Naruto"]} />
      </Container>
    </div>
  )
}

export default App
