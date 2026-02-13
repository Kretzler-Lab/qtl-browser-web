import { ApolloClient, HttpLink, gql, CombinedGraphQLErrors, CombinedProtocolErrors, InMemoryCache, ApolloLink } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import type { AutoCompleteResult } from "./schema";
import { sendMessageToBackend } from "../actions/Error/errorActions";
import packageJson from '../../package.json';

const isDevelopment = () => {
    if(import.meta.env.VITE_NODE_ENV === "development"){
      
      return true;
    }else{
      return false
    }
};


const getBaseURL = () => {
    if (isDevelopment()) {
        return packageJson.proxy;
    }
    return '';
};

const httpLink = new HttpLink({
    uri: getBaseURL() + '/graphql',
    fetchOptions: {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
        }
    }
});

const errorLink = new ErrorLink(({ error }) => {
    if (CombinedGraphQLErrors.is(error)) {
        error.errors.forEach(({ message, locations, path }) =>
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        );
    } else if (CombinedProtocolErrors.is(error)) {
        error.errors.forEach(({ message, extensions }) =>
            console.log(
                `[Protocol error]: Message: ${message}, Extensions: ${JSON.stringify(
                    extensions
                )}`
            )
        );
    } else {
        console.error(`[Network error]: Could not connect to GraphQL. ${error}`);
    }
});

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, httpLink])
})

export const fetchAutoComplete = async (searchString: string) => {
    if (searchString && searchString.trim().length < 2) {
        return [];
    }

    interface AutoCompleteData {
        autocomplete: AutoCompleteResult[];
    }
    const GET_AUTO_COMPLETE = gql`
        query Autocomplete($searchTerm: String!) {
            autocomplete(searchTerm: $searchTerm) {
                value
                name
                type
                id
                ensg_id
                aliases
            }
        }`;

    const { error, data } = await apolloClient.query<AutoCompleteData>({
        query: GET_AUTO_COMPLETE,
        variables: { searchTerm: searchString }
    })

    if (data && data.autocomplete) {
        return data.autocomplete;
    } else {
        sendMessageToBackend("Could not retrieve autocomplete data: " + error?.message, true);
    }
}

