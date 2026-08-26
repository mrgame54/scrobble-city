import { useState } from 'react'
import './Hud.css'
import { fakeScrobbleData } from '../dummydata.js'

export default function Hud({ cameraMode, setCameraMode, setSearchConfig, setUserInfo, userInfo}) {
    const [localUser, setLocalUser] = useState('')
    const [localType, setLocalType] = useState('tracks')

    const handleSearch = async (e) => {
        e.preventDefault()
        try{
            // set username
            const response = await fetch ('http://localhost:5000/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ username: localUser })
            })
            // load everything
            setSearchConfig({ username: localUser, type: localType })
            // load user data
            const userData = await response.json()
            if (userData && userData.length > 0) {
                setUserInfo(userData[0]);
            }
            
        }
        catch (err){
            console.error("Failed to find user :(", err)
        }
    }

    return (
        <div className="hud-container">
            <div className="hud-panel control-panel">
                <h2>Scrobble City</h2>
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Enter Last.fm username..."
                        value={localUser}
                        onChange={(e) => setLocalUser(e.target.value)}
                    />
                    
                    {/* slider for all data types */}
                    <select
                        value={localType}
                        onChange={(e) => setLocalType(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px', background: '#333', color: 'white', borderRadius: '6px' }}
                    >
                        <option value="tracks">Tracks</option>
                        <option value="artists">Artists</option>
                        <option value="tags">Tags</option>
                    </select> 
                    
                    <button type="submit">Visualize</button>
                </form>

                {/* user data*/}
                {userInfo && (
                    <div style={{ marginTop: '20px', padding: '10px', background: '#222', borderRadius: '8px', display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <img 
                            src={userInfo.image[2]['#text']} 
                            alt="Profile" 
                            style={{ width: '64px', height: '64px', borderRadius: '50%' }}
                        />
                        <div>
                            <h3 style={{ margin: '0 0 5px 0' }}>{userInfo.name}</h3>
                            <p style={{ margin: '0', fontSize: '12px', color: '#aaa' }}>Scrobbles: {userInfo.playcount}</p>
                            <p style={{ margin: '0', fontSize: '12px', color: '#aaa' }}>Artists: {userInfo.artist_count}</p>
                        </div>
                    </div>
                )}

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
    )
}