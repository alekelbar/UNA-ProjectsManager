import { ApolloProvider } from '@apollo/client'
import client from '../config/apollo'

const myApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default myApp;