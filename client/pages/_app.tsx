import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  createClient,
  Provider,
  defaultExchanges,
  subscriptionExchange,
} from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

const subscriptionClient = process.browser
  ? new SubscriptionClient('ws://localhost:4000/graphql', { reconnect: true })
  : null;

const client = createClient({
  url: 'http://localhost:4000/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: (operation) =>
        subscriptionClient!.request(operation),
    }),
  ],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
