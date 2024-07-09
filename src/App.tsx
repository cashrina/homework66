import MealForm from "./container/MealForm/MealForm.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./container/Home/Home.tsx";
import Toolbar from "./components/Toolbar/Toolbar.tsx";

const App = () => {

  return (
      <>
        <header><Toolbar/></header>
        <div className="container mt-5">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="new-dish" element={<MealForm/>}/>
            <Route path="/dishes/:id/edit" element={<MealForm/>}/>
          </Routes>
        </div>
      </>

  )
};

export default App
