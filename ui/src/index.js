import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/index';
import registerServiceWorker from './registerServiceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom'

//Reference styles inside the application
import './styles/index.scss';

const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_URI
})

const Main = () => (
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>
)

ReactDOM.render(<Main />, document.getElementById('root'));
registerServiceWorker();
