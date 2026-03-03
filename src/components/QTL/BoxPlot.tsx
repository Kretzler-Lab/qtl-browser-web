import type {FC} from 'react';
import Plot from 'react-plotly.js';
import type {DiseasePlotContainer} from './VariantEffectsView.tsx'

interface BoxPlotProps {
        plotData: DiseasePlotContainer
}

export const BoxPlot: FC<BoxPlotProps> = ({plotData}) => {
  const disease = (disease: string) => {
    if (disease !== "all_co"){
      return disease;
    }else{
      return "all"
    }
  }
    return (
        <Plot
            data={plotData.plotData}
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
                        text: disease(plotData.disease),
                        font: { family: 'Arial, sans-serif', size: 14, color: '#333' },
                        standoff: 40
                    }
                },
                yaxis: {
                    title: {
                        text: plotData.gene + ' expression',
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
