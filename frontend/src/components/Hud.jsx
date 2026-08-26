import { useState } from 'react'
import './Hud.css'
import { fakeScrobbleData } from '../dummydata.js'

export default function Hud({ cameraMode, setCameraMode, setSearchConfig}) {
    const [localUser, setLocalUser] = useState('')

    const handleSearch = async (e) => {
        e.preventDefault()
        try{
            // set username
            await fetch ('http://localhost:5000/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username: localUser })
            })
            // load tracks
            setSearchConfig({ username: localUser, type: 'tracks' })
        }
        catch (err){
            console.error("Failed to find user :(", err)
        }
    }

    return (
        <div className="hud-container">
            <div className="hud-panel control-panel">
                <h2>Settings</h2>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Enter Last.fm username..."
                        value={localUser}
                        onChange={(e) => setLocalUser(e.target.value)}
                    />
                    
                    {/* slider for all data types 
                    <select
                        value={localType}
                        onChange={(e) => setLocalType(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#333', color: 'white', borderRadius: '6px' }}
                    >
                        <option value="tracks">Tracks</option>
                        <option value="artists">Artists</option>
                        <option value="artists">Tags</option>
                    </select> */ }
                    
                    <button type="submit">Visualize</button>
                </form>

                {/*  camera controls */}
                <hr style={{ margin: '15px 0', borderColor: 'rgba(255,255,255,0.1)' }} />
                <button
                    type="button"
                    onClick={() => setCameraMode(cameraMode === 'orbit' ? 'walk' : 'orbit')}
                    style={{ background: '#333' }}
                >
                    Switch to {cameraMode === 'orbit' ? 'Walk Mode' : 'Orbit Mode'}
                </button>
            </div>
        </div>
    );
}