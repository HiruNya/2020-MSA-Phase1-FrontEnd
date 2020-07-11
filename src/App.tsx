import React from 'react'
import './App.css'
import {Container} from "@material-ui/core"
import SearchBar from "./SearchBar";

function App() {
  return (
    <div className="App">
      <Container maxWidth="lg">
        <SearchBar />
      </Container>
    </div>
  )
}

export default App
