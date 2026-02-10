import { ApolloClient, HttpLink, gql, CombinedGraphQLErrors, CombinedProtocolErrors, InMemoryCache, ApolloLink, type TypedDocumentNode } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import type { AutoCompleteResult } from "./schema";


const getBaseURL = () => {
    // return 'https://curegn-qtls.miktmc.org';
    return '';
};

const httpLink = new HttpLink({
    uri: getBaseURL() + '/graphql',
    fetchOptions: {
        method: 'POST',
        mode: 'no-cors',
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
    if(searchString && searchString.trim().length < 2) {
        return [];
    }

    interface AutoCompleteData {
        autoComplete: AutoCompleteResult[];
    }

    const GET_AUTO_COMPLETE = gql `
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
    console.log(data);
    return [];
}