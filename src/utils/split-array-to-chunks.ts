import { LegendItemData } from '@components/column-chart-legend/column-chart-legend';

export const splitArrayToChunks = (arr: Array<LegendItemData>, chunkSize: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
};
