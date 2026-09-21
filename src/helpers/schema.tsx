export type AutocompleteResult = {
    value: string;
    name: string;
    type: string;
    id: string;
    ensg_id: string;
    aliases: string[] | null;
    __typename: string;
}

export type BoxplotCount = {
    genotype: string;
    count: number;
};

export type BoxplotData = {
    curegnId: string;
    genotype: number;
    ensg_id: string;
    pheno: number;
};

export type BoxplotVizData = {
    groups: any;
    disease: string;
    boxplotData: BoxplotData[];
    counts: BoxplotCount[];
    qtl: Qtl;
};

export type Qtl = {
    id: QtlId;
    tssDistance: number;
    maf: number;
    pval: number | string;
    slope: number;
    slopeSe: number;
    geneSymbol: string | null;
};

export type QtlId = {
    ensgId: string;
    variantId: string;
    dx: string;
};

export type Gene = string;

export type searchTerm = {
    term: string | null;
    type: searchTermType;
};

export const searchTypes = {
    autoComplete: "autoComplete",
    snp: "snpLocation"
} as const;
type searchTermType = typeof searchTypes[keyof typeof searchTypes];