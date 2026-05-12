export const formatNumber = (num: number): string => {
    if (num >= 0.0001) {
        return num.toFixed(4).replace(/\.?0+$/, "");
    }
    return num.toExponential(3);
};

export const generateGenotypeLabels = (variantId: string): string[] => {
    try {
        const parts = variantId.split('-');
        if (parts.length < 4) {
            return ['0', '1', '2'];
        }
        
        const ref = parts[2];
        const alt = parts[3];

        const getSimplifiedAllele = (allele: string): string => {
            if (allele.length <= 2) {
                return allele;
            } else {
                return allele.substring(0, 2) + '+';
            }
        };

        const refSimplified = getSimplifiedAllele(ref);
        const altSimplified = getSimplifiedAllele(alt);

        return [
            `${refSimplified}/${refSimplified}`,
            `${refSimplified}/${altSimplified}`,
            `${altSimplified}/${altSimplified}`
        ];
    } catch (error) {
        console.warn('Error generating genotype labels:', error);
        return ['0', '1', '2'];
    }
};