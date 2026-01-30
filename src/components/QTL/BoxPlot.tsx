import type {FC} from 'react';
import Plot from 'react-plotly.js';

interface BoxPlotProps {
    data: Array<{
        y: number[];
        name: string;
    }>;
}

export const BoxPlot: FC<BoxPlotProps> = ({data}) => {
    return (
        <Plot
            data={data.map(trace => ({
                type: 'box',
                y: trace.y,
                name: trace.name,
                boxpoints: false
            }))}
            layout={{
                width: 200,
                height: 300,
                margin: {
                    l: 50,
                    r: 50,
                    b: 50,
                    t: 50
                },
                showlegend: false
            }}
            config={{
                displayModeBar: false
            }}
        />
    );
};
