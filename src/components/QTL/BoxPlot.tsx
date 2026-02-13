import type {FC} from 'react';
import Plot from 'react-plotly.js';

interface BoxPlotProps {
    data: {
        x: number[],
        y: number[];
        name: string;
        gene: string;
        disease: string;
    };
}

export const BoxPlot: FC<BoxPlotProps> = ({data}) => {
    console.log(data)
    return (
        <Plot
            data={data}
            layout={{
                width: 200,
                height: 300,
                plot_bgcolor: "#f0f0f0",
                margin: {
                    l: 35,
                    r: 0,
                    b: 30,
                    t: 30
                },
                xaxis: {
                    title: {
                        text: data.disease,
                        font: { family: 'Arial, sans-serif', size: 14, color: '#333' },
                        standoff: 40
                    }
                },
                yaxis: {
                    title: {
                        text: data.gene + ' expression',
                        font: {family: 'Arial, sans-serif', size: 14, color: '#333'},
                        standoff: 40
                    },
                    zeroline: false
                },
                showlegend: false
            }}
            config={{
                displayModeBar: false
            }}
        />
    );
};
