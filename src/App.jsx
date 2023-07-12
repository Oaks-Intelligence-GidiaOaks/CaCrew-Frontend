import "./App.scss";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesConfig from "./routes/routesConfig";
import { Provider } from "react-redux";
import store, { persistor } from "redux/store";
import Modal from "components/primitives/shared/modal/Modal";
import { PersistGate } from "redux-persist/integration/react";
import { AutoLogout } from "components";

function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <Router>
              <Modal />
              <AutoLogout />
              <RoutesConfig />
            </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
