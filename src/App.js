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

function NavBar({ children, onSearch }) {
  return (
    <nav className="container">
      <Logo />
      <Search onSearch={onSearch} />
      {children}
    </nav>
  );
}

function Logo() {
  return <img src="/images/logo1.png" alt="Logo" className="logo-pic" />;
}

function NumberResult({ music }) {
  return (
    <p className="textcolor">
      Found <strong>{music.length}</strong> results
    </p>
  );
}

function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);
    onSearch(searchTerm);
  };
  return (
    <input
      className="search"
      type="text"
      placeholder="What do you want to play?"
      value={query}
      onChange={handleSearch}
    />
  );
}

function Music({ music, playlist, setPlaylist }) {
  const [sortBy, setSortBy] = useState("");

  const addToPlayList = (music) => {
    const index = playlist.findIndex((item) => item.id === music.id);
    if (index === -1) {
      setPlaylist([...playlist, music]);
    } else {
      const updatedPlaylist = playlist.filter((item) => item.id !== music.id);
      setPlaylist(updatedPlaylist);
    }
  };

  const sortByTitle = () => {
    const sortedMusic = [...music].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    return sortedMusic;
  };

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSortBy(selectedSort);
  };

  let sortedMusic;
  if (sortBy === "title") {
    sortedMusic = sortByTitle();
  } else {
    sortedMusic = music;
  }

  return (
    <ul>
      <h2>Music List</h2>
      <select className="select" value={sortBy} onChange={handleSortChange}>
        <option value="">Sort By</option>
        <option value="title">Sort By: Title</option>
      </select>

      {sortedMusic.map((musicItem) => (
        <li
          key={musicItem.id}
          style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}
        >
          {musicItem.title} by {musicItem.artist} ({musicItem.genre}){" "}
          <button
            onClick={() => addToPlayList(musicItem)}
            style={{ marginLeft: "8px", backgroundColor: "#fffff" }}
          >
            {playlist.some((item) => item.id === musicItem.id) ? (
              <i className="fa fa-heart" style={{ color: "#1db954" }}></i>
            ) : (
              <i className="fa fa-heart" style={{ color: "#fff" }}></i>
            )}
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
      <h2>Favorites</h2>

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
      <p>
        Total <strong>{playlist.length}</strong> Songs
      </p>
    </>
  );
}

function Main({ children }) {
  return <div className="container">{children}</div>;
}

export default App;
