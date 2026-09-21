import {type FC} from 'react';
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
            data={plotData.plotData.map(trace => ({
              ...trace,
              boxpoints: false
            }))}
            layout={{
                width: 200,
                height: 300,
                plot_bgcolor: "#f0f0f0",
                hovermode: false,
                dragmode: false,

                margin: {
                    l: 35,
                    r: 0,
                    b: 60,
                    t: 30
                },
                xaxis: {
                    title: {
                        text: disease(plotData.disease),
                        font: { family: 'Arial, sans-serif', size: 14, color: '#333' },
                        standoff: 40
                    },
                    fixedrange: true
                },
                yaxis: {
                    title: {
                        text: "Normalized expression",
                        font: {family: 'Arial, sans-serif', size: 14, color: '#333'},
                        standoff: 40
                    },
                    zeroline: false,
                    fixedrange: true
                },
                showlegend: false
            }}
            config={{
                displayModeBar: true,
                displaylogo: false,
                modeBarButtonsToRemove: [
                'zoom2d', 'pan2d', 'select2d', 'lasso2d',
                'zoomIn2d', 'zoomOut2d', 'autoScale2d', 'resetScale2d',
                'hoverClosestCartesian',
                'hoverCompareCartesian',
                
              ],
              scrollZoom: false,
              toImageButtonOptions: {
                format: 'png',
                filename: `${plotData.gene}_${disease(plotData.disease)}_${plotData.variant}_boxplot`,
                width: 800,
                height: 1200,
              },
            }}
        />
    );
};
