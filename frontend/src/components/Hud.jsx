import { useState } from 'react';
import './Hud.css'; // We will create this next
import { fakeScrobbleData } from '../dummydata.js';

export default function Hud() {
  const [username, setUsername] = useState('');
  const [data, setData] = useState(null);

  // Backend Simulation 
  const handleSearch = (e) => {
    e.preventDefault();
    console.log(`Fetching data for: ${username}`);
    // loading the fake data 
    setData(fakeScrobbleData); 
  };

  return (
    <div className="hud-container">
      <div className="hud-panel control-panel">
        <h2>Settings</h2>
        <form onSubmit={handleSearch}>
          <input 
            type="text" 
            placeholder="Enter Last.fm username..." 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Visualize</button>
        </form>
      </div>

      {/* show stats if data is loaded */}
      {data && (
        <div className="hud-panel stats-panel">
          <img src={data.nowPlaying.imageUrl} alt="Album Art" className="album-art"/>
          <div className="track-info">
            <p className="label">NOW PLAYING</p>
            <h3>{data.nowPlaying.track}</h3>
            <p>{data.nowPlaying.artist}</p>
          </div>
          <div className="user-stats">
            <p>User: <strong>{data.user.name}</strong></p>
            <p>Total Scrobbles: <strong>{data.user.totalScrobbles.toLocaleString()}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}