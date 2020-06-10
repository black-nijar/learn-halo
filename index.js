import "react-native-gesture-handler";
import React from "react";
import { registerRootComponent } from "expo";

import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./src/reducers/rootReducer";

const store = createStore(rootReducer);

const ReduxStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

registerRootComponent(ReduxStore);
