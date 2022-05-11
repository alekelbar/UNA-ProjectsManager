/**
 * @brief PENDING TASKS TODO:'s:
 * * DO: Refactorizar los procedimientos
 * * 1. Separar los resolvers
 * * 2. Separar los schemas
 * * 3. plantear un archivo JS de configuración
 * * 4. Estandarizar los mensajes de error
 * * 5. Estandarizar los schemas
 * * 6. Estandarizar los resolvers
 * * 7.  Comentar las transacciones importantes
 * * 8. Implementar babel para migrar a una sintaxis más moderna
 */

//Server tools
const { ApolloServer } = require("apollo-server");
const resolvers = require("./db/resolvers");
const typeDefs = require("./db/schema");

//Database connection
const connectDataBase = require("./config/db");
debugger;
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
