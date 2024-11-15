import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "https://codefact.udea.edu.co/modulo-02/graphql",
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
