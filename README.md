# scrobble-city
---
A Single-Page-Application (SPA) designed for interactive visualization of your last.fm Scrobbles. The frontend is implemented with React and the backend API uses Node.js as well as Express for data processing.

---
### 📦 Technologies
* `Cross-Platform Web`
* `React`
* `Node.js`
* `Express.js`

---
### 🦄 Features
* **Interactive Visualization:** Single-Page-Application that visualizes last.fm user data as a city.
* **User Login:** Supports using any last.fm accounts scrobbles to visualize.
* **Variety of Data Supported:** Allows using a users favorite Artists, Songs and Tags for visualization.

--- 
### 🚀 Getting Started

**1. Clone the Repository**
```bash
git clone [https://github.com/mrgame54/scrobble-city.git](https://github.com/mrgame54/scrobble-city.git)
cd scrobble-city
```
2. Set Up the Backend
Navigate to the backend directory and install the required dependencies:
```bash
   cd backend
   npm install
```
Create a .env file in the root of the backend directory and add your Last.fm credentials alongside a session secret:
```bash
LASTFM_API_KEY=your_lastfm_api_key_here
SESSION_SECRET=your_secure_random_secret
```
Start the backend server (it runs on port 5000):
```bash
node index.js
```
3. Set Up the Frontend
Open a new terminal window, navigate to the frontend directory, install the dependencies, and start the Vite development server:

```
cd frontend
npm install
npm run dev
```

4. Explore your City!
Open your browser and navigate to http://localhost:5173. Enter a valid Last.fm username in the HUD, select your data type (Tracks, Artists, or Tags), and click Visualize to generate the City!!


---
### 🍿 Video Preview

https://github.com/user-attachments/assets/b8f9aa29-121c-446a-b6e5-ba656e94d816


