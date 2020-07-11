import React from "react"
import {GridList, GridListTile} from "@material-ui/core";

function AnimeGrid(props: {anime: string[]}): React.ReactElement {
  return (
    <GridList>
      { props.anime.map((anime) => (
        <GridListTile>
          <div style={{width: "100%", height: "100%", backgroundColor: "darkred"}}>{anime}</div>
        </GridListTile>
      ))}
    </GridList>
  )
}

export default AnimeGrid;
