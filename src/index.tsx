import React from "react";
import ReactDOM from "react-dom";
import App from "Components/App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "styles";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { PersistGate } from "redux-persist/integration/react";

const authLink = setContext((_, { headers }) => {
  const state = store.getState();
  const token = state.user.token;

  return {
    headers: {
      ...headers,
      authorization: token ? token : "",
    },
  };
});

const uploadLink = createUploadLink({ uri: "http://localhost:4000/" });

const client = new ApolloClient({
  //@ts-ignore
  link: authLink.concat(uploadLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
