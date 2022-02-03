import './App.css';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
//import Form from './components/Form/Form';
// import { BrowserRouter } from 'react-router-dom';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import MyRecipes from './components/MyRecipes/MyRecipes';
import AddNewRecipe from './components/Form/AddNewRecipe';

function App() {
  return (
    
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/recipes" element={<Home />}></Route>
          {/* <Route path="/createRecipe" element={<Form />} /> */}
          <Route path="/createRecipe" element={<AddNewRecipe />} />
          <Route path="/detail/:id" element={<RecipeDetail />} />
          <Route path='/ownRecipes' element={<MyRecipes />} />
          
        </Routes>
      </div>
    
  );
}

export default App;
