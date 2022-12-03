import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/navbar";
import CreateAccPage from "./Pages/CreateAccPage"
import { Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div>
        <Routes>
          <Route path="/CreateAcc" element={<CreateAccPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
