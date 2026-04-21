export const formatNumber = (num: number): string => {
    if (num >= 0.0001) {
        return num.toFixed(4).replace(/\.?0+$/, "");
    }
    return num.toExponential(3);
};