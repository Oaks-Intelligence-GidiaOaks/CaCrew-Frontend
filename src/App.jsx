import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./routes/routesConfig";
import { Provider } from "react-redux";
import store from "redux/store";
import { ModalContextProvider } from "context/modalContext";
import Modal from "components/primitives/modal/Modal";

function App() {
  return (
    <>
      <Provider store={store}>
        <ModalContextProvider>
          <Router>
            <Modal />
            <RoutesConfig />
          </Router>
        </ModalContextProvider>
      </Provider>
    </>
  );
}

export default App;
