import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./routes/routesConfig";
import { Provider } from "react-redux";
import store, { persistor } from "redux/store";
import { ModalContextProvider } from "context/modalContext";
import Modal from "components/primitives/shared/modal/Modal";
import { PersistGate } from "redux-persist/integration/react";
import { AutoLogout } from "components";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ModalContextProvider>
            <Router>
              <Modal />
              <AutoLogout />
              <RoutesConfig />
            </Router>
          </ModalContextProvider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
