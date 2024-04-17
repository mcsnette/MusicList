import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
const tempMusicData = [
  {
    id: 1,
    title: "Pantropiko",
    artist: "Bini",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Alam mo ba girl?",
    artist: "Hev Abi",
    genre: "Hiphop",
  },
  {
    id: 3,
    title: "Selos",
    artist: "Shaira",
    genre: "Pop",
  },
  {
    id: 4,
    title: "Backburner",
    artist: "NIKI",
    genre: "R&B",
  },
  {
    id: 5,
    title: "Your Universe",
    artist: "Rico Blanco",
    genre: "Alternative/Indie",
  },
  {
    id: 6,
    title: "Burnout",
    artist: "Sugarfree",
    genre: "Alternative Rock",
  },
  {
    id: 7,
    title: "Cornelia Street",
    artist: "Taylor Swift",
    genre: "Pop",
  },
  {
    id: 8,
    title: "Dasal/Kasal",
    artist: "Zild",
    genre: "Pop",
  },
  {
    id: 9,
    title: "intro (end of the world)",
    artist: "Ariana Grande",
    genre: "R&B",
  },
  {
    id: 10,
    title: "Lagi",
    artist: "BINI",
    genre: "Pop",
  },
  {
    id: 11,
    title: "Bad Boy",
    artist: "BIGBANG",
    genre: "Hiphop",
  },
  {
    id: 12,
    title: "Mrs. Potato Head",
    artist: "Melanie Martinez",
    genre: "Alternative/Indie",
  },
  {
    id: 13,
    title: "Same Ground",
    artist: "Kitchie Nadal",
    genre: "Rock",
  },
  {
    id: 14,
    title: "Lackin'",
    artist: "Denise Julia",
    genre: "R&B",
  },
  {
    id: 15,
    title: "UNKNOWN",
    artist: "NCT DREAM",
    genre: "Pop",
  },
  {
    id: 16,
    title: "Be There For Me",
    artist: "NCT 127",
    genre: "Pop",
  },
  {
    id: 17,
    title: "Unti-Unti",
    artist: "Up Dharma Down",
    genre: "Alternative/Indie",
  },
  {
    id: 18,
    title: "Tataya",
    artist: "Cup of Joe",
    genre: "Pop",
  },
  {
    id: 19,
    title: "Kahit Isang Saglit",
    artist: "Hulyo",
    genre: "Pop",
  },
  {
    id: 20,
    title: "Guijo St. (Makes You Wonder)",
    artist: "Apartel",
    genre: "Alternative/Indie",
  },
];
const tempPlaylist = [];

function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search music..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

//******************* */
function NavBar({ children, onSearch }) {
  return (
    <nav className="container">
      <Logo />
      <Search onSearch={onSearch} />
      {children}
    </nav>
  );
}

function App() {
  const [music, setMusic] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [filteredMusic, setFilteredMusic] = useState(tempMusicData);

  const handleSearch = (searchTerm) => {
    const filtered = music.filter(
      (musicItem) =>
        musicItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        musicItem.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
        musicItem.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMusic(filtered);
  };

  const addToPlaylist = (music) => {
    setPlaylist([...playlist, music]);
  };

  return (
    <div>
      <NavBar onSearch={handleSearch}>
        <NumberResult music={filteredMusic} />
      </NavBar>
      <Main>
        <Box>
          <Music
            music={filteredMusic}
            playlist={playlist}
            setPlaylist={setPlaylist}
          />
        </Box>
        <Box>
          <Playlist playlist={playlist} />
        </Box>
      </Main>
    </div>
  );
}

function Logo() {
  return <h1>Music App Logo</h1>;
}

function NumberResult({ music }) {
  return (
    <p>
      Found <strong>{music.length}</strong> results
    </p>
  );
}

function Music({ music, playlist, setPlaylist }) {
  const addToPlaylist = (music) => {
    const index = playlist.findIndex((item) => item.id === music.id);
    if (index === -1) {
      setPlaylist([...playlist, music]);
    } else {
      const updatedPlaylist = playlist.filter((item) => item.id !== music.id);
      setPlaylist(updatedPlaylist);
    }
  };

  return (
    <ul>
      <h2>Music List</h2>
      {music.map((musicItem) => (
        <li
          key={musicItem.id}
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          {musicItem.title} by {musicItem.artist} ({musicItem.genre}){" "}
          <button
            onClick={() => addToPlaylist(musicItem)}
            style={{ marginLeft: "8px" }}
          >
            {playlist.some((item) => item.id === musicItem.id)
              ? "Unfavorite 💔"
              : "Favorite ❤️"}
          </button>
        </li>
      ))}
    </ul>
  );
}

function Box({ children }) {
  return <div className="container">{children}</div>;
}

function Playlist({ playlist }) {
  return (
    <>
      <h2>Playlist</h2>
      <ul>
        {playlist.map((music) => (
          <li key={music.id}>
            <p>
              {music.title} by {music.artist}
              <span></span>
              <span>{music.rating}</span>
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}

function Main({ children }) {
  return <div className="container">{children}</div>;
}

export default App;
