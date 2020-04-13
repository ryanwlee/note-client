import React from "react";
import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import Container from "./Components/Container";

const client = new ApolloClient({
  uri: process.env.REACT_APP_API_SERVER,
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Container />
      </div>
    </ApolloProvider>
  );
}

export default App;
