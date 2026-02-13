import { createSlice } from "@reduxjs/toolkit";
import type { AutoCompleteResult } from "../../helpers/schema";

const initialState: AutoCompleteResult[] = [
    {
        value: "NF1",
        name: "neurofibromin 1",
        type: "gene",
        id: "4763",
        aliases: [
            "NFNS",
            "VRNF",
            "WSS"
        ],
        ensg_id: "ENSG00000196712",
        __typename: "AutoCompleteResult"
    },
    {
        value: "NF1P1",
        name: "neurofibromin 1 pseudogene 1",
        type: "gene",
        id: "100419006",
        aliases: [
          "NF1HHS"
        ],
        ensg_id: "ENSG00000270831",
        __typename: "AutoCompleteResult"
      },
];

const autoCompleteSlice = createSlice({
    name: "autoComplete",
    initialState,
    reducers: {}
})

export default autoCompleteSlice.reducer;