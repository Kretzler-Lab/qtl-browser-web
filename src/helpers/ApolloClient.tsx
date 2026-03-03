import { ApolloClient, HttpLink, gql, CombinedGraphQLErrors, CombinedProtocolErrors, InMemoryCache, ApolloLink } from "@apollo/client";
import { ErrorLink } from "@apollo/client/link/error";
import type {AutocompleteResult, BoxplotVizData, Qtl} from "./schema";
import { sendMessageToBackend } from "../actions/Error/errorActions";
import packageJson from '../../package.json';

const isDevelopment = () => {
    return import.meta.env.MODE === "development";
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

export const fetchFindByIdEnsgId = async (ensg_id: string) => {
  interface GeneData{
    findByIdEnsgId: Qtl;
  }

  const GET_GENE_BY_ENSG_ID = gql`
    query findByIdEnsgId($ensgId: String!) {
        findByIdEnsgId(ensgId: $ensgId) {
          id {
            ensgId
            variantId
            dx
          }
          tssDistance
          maf
          pval
          slope
          slopeSe
        }
    }
  `;
  const { error, data } = await apolloClient.query<GeneData>({
    query: GET_GENE_BY_ENSG_ID,
    variables: { ensgId: ensg_id }
  })

  if (data && data.findByIdEnsgId) {
    return data.findByIdEnsgId;
  }else {
    sendMessageToBackend("Could not retrieve gene data: " + error?.message, true);
  }
}

export const fetchAutocomplete = async (searchString: string) => {
    if (searchString && searchString.trim().length < 2) {
        return [];
    }

    interface AutocompleteData {
        autocomplete: AutocompleteResult[];
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

    const { error, data } = await apolloClient.query<AutocompleteData>({
        query: GET_AUTO_COMPLETE,
        variables: { searchTerm: searchString }
    })

    if (data && data.autocomplete) {
        return data.autocomplete;
    } else {
        sendMessageToBackend("Could not retrieve autocomplete data: " + error?.message, true);
    }
}

export const fetchBoxplotData = async (variant_id: string, ensg_id: string): Promise<BoxplotVizData[]> => {

    interface BoxplotVizDataResponse {
        getBoxplotData: BoxplotVizData[]
    }

    const GET_BOXPLOT_DATA = gql`
        query Boxplot($variantId: String!, $ensgId: String!) {
            getBoxplotData(variantId: $variantId, ensgId: $ensgId) {
                disease
                groups {
                    genotype
                    count
                    phenotypes
                }
                qtl {
                    id {
                        ensgId
                        variantId
                        dx
                    }
                    tssDistance
                    maf
                    pval
                    slope
                    slopeSe
                }

            }
        }`;

    const { error, data } = await apolloClient.query<BoxplotVizDataResponse>({
        query: GET_BOXPLOT_DATA,
        variables: { variantId: variant_id, ensgId: ensg_id }
    })

    if (data && data.getBoxplotData) {
        return data.getBoxplotData;
    } else {
        sendMessageToBackend("Could not retrieve boxplot data: " + error?.message, true);
        return [];
    }
}
