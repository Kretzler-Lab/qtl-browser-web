export type AutoCompleteResult = {
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
};

export type QtlId = {
    ensgId: string;
    variantId: string;
    dx: string;
};

