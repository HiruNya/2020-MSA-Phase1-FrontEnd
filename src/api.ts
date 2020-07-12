
const ANILIST_URL: string = "https://graphql.anilist.co"

const QUERY: string = `
query ($query: String, $genres: [String]) {
  Page(page: 0, perPage: 12) {
    media(search: $query, genre_in: $genres, type: ANIME) {
      coverImage {
        medium
        large
      }
      description(asHtml: false)
      title {
        romaji
        english
      }
    }
  }
}
`

const GENRES = ["Action", "Adventure", "Comedy", "Drama", "Ecchi", "Fantasy", "Horror", "Mahou Shoujo", "Mecha",
  "Music", "Mystery", "Psychological", "Romance", "Sci-Fi", "Slice Of Life", "Sport", "Supernatural", "Thriller",
  "Hentai"]


function options(query: string, genres: string[]): RequestInit {
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      query: QUERY,
      variables: {
        query: (query !== "")? query: null,
        genres: (genres.length > 0)? genres: null
      }
    })
  }
}

type RawAnimeEntry = {
  coverImage: {
    medium: string | null,
    large: string | null,
  },
  description: string | null,
  title: {
    romaji: string | null,
    english: string | null,
  },
}

export type AnimeEntry = {
  description: string,
  image: string,
  title: string,
}

function fromRawAnimeEntry(raw: RawAnimeEntry): AnimeEntry {
  const description = (raw.description)? raw.description: "";

  let image = raw.coverImage.large
  if (image == null) {
    image = raw.coverImage.medium
  }
  if (image == null) {
    image = ""
  }

  let title = raw.title.english
  if (title == null) {
    title = raw.title.romaji
  }
  if (title == null) {
    title = ""
  }

  return { description, image, title }
}

async function search(query: string, genres: string[]): Promise<AnimeEntry[]> {
  return await fetch(ANILIST_URL, options(query, genres))
    .then(response => response.json())
    .then(json => json.data.Page.media.map(fromRawAnimeEntry))
}

export {GENRES, search};
