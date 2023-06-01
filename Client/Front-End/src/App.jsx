import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar} from "./components/navbar";
import { SavedMovies } from "./pages/Saved-movies";
import { Home } from "./pages/home";
import { Auth } from "./pages/auth";

function App() {
  return (
    <div className="container">
      <Router>  
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
