import React, {useState} from "react"
import {Accordion, AccordionDetails, AccordionSummary, Card, CardContent, CardMedia, Collapse, Typography} from "@material-ui/core"
import {ExpandMore} from "@material-ui/icons"
import {AnimeEntry} from "./api"

function AnimeTile(props: {anime: AnimeEntry}): React.ReactElement {
  const [expanded, setExpanded] = useState(false)
  const anime = props.anime

  return (
    <div className="anime-tile" onClick={_ => setExpanded(expanded => !expanded)}>
      <Card variant="outlined">
        <Collapse in={!expanded}>
          <CardMedia
            height="280"
            component="img"
            image={anime.image}
            title={anime.title}
          />
        </Collapse>
        <CardContent>
          <Accordion expanded={expanded} elevation={0}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography variant="subtitle1" noWrap>
                {anime.title}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body1">
                {anime.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}

function AnimeGrid(props: { anime: AnimeEntry[] }): React.ReactElement {
  return (
    <div style={{display: "flex", flexWrap: "wrap"}}>
      {props.anime.map((a) => <AnimeTile anime={a} />)}
    </div>
  )
}

export default AnimeGrid;
