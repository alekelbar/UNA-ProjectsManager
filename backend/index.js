//Server tools
const { ApolloServer, gql } = require("apollo-server");
const resolvers = require("./db/resolvers");
const typeDefs = require("./db/schema");

//Database connection
const connectDataBase = require("./config/db");
connectDataBase();

//My server...
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//Start my server, it't respond a promise
server.listen().then(({ url }) => {
  console.log(`The server it's running at ${url}`);
});
