import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
//import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element= {<LandingPage/>} />
          <Route path="/recipes" element= {<Home/>}></Route>
          {/* <Route path="/detail/:id" element= {<RecipeDetail/>} /> */}

          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
