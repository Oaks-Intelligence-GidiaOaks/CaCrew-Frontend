import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from  "./routes/routesConfig"

function App() {
  return (
    <>
      <Router>
        <RoutesConfig />
      </Router>
    </>
  );
}

export default App;
