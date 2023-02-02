import './App.css'
import ShortUrl from "./Components/ShortUrl"
import { useLocation } from 'react-router-dom';


function App() {
    const location = useLocation();

    console.log(location)
    return (
        <div className="App">
            <h1>Url Shortener</h1>
            <ShortUrl />
        </div>
    )
}

export default App
