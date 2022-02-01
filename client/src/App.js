import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Form from './components/Form/Form';
import { BrowserRouter } from 'react-router-dom';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import MyRecipes from './components/MyRecipes/MyRecipes';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/recipes" element={<Home />}></Route>
          <Route path="/createRecipe" element={<Form />} />
          <Route path="/detail/:id" element={<RecipeDetail />} />
          <Route path='/ownRecipes' component={MyRecipes} />
          
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
