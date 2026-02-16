import {type FC, useEffect, useState} from 'react';
import {Row, Col} from 'reactstrap';
import {BoxPlot} from "./BoxPlot.tsx";
import type {Data} from 'plotly.js';
import {fetchBoxplotData} from "../../helpers/ApolloClient.tsx";
import type {BoxplotVizData} from "../../helpers/schema.tsx";

interface VariantEffectsViewProps {
    variant_id: string;
    ensg_id: string;
}

export interface DiseasePlotContainer {
    plotData: Data[];
    disease: string;
    gene: string;
    variant: string;
}

export const VariantEffectsView: FC<VariantEffectsViewProps> = ({variant_id, ensg_id}) => {

    const [boxplot_data, setBoxplotData] = useState<Record<string, DiseasePlotContainer>>({});
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const box_data = await fetchBoxplotData(variant_id, ensg_id);

                // Create a map keyed by disease
                const mappedDiseases: Record<string, BoxplotVizData> = Object.values(box_data).reduce<Record<string, BoxplotVizData>>((acc: any, curr: any) => {
                    acc[curr.disease] = (curr as BoxplotVizData);
                    return acc;
                }, {} as Record<string, BoxplotVizData>);

                const colors = ['#636EFA', '#EF553B', '#00CC96'];


                const plotsByDisease = Object.keys(mappedDiseases as Object).reduce<Record<string, DiseasePlotContainer>>((acc, disease) => {
                    const diseaseData = mappedDiseases[disease];

                    const traces: Data[] = diseaseData.groups.map((group: any, index: number) => ({
                        x: group.phenotypes.map(() => `${group.genotype}`),
                        y: group.phenotypes.map((val: any) => parseFloat(val)),
                        name: `${group.genotype}`,
                        type: 'box',
                        marker: {
                            color: colors[index % colors.length]
                        },
                        boxpoints: 'all',
                        jitter: 0.3,
                        pointpos: -1.8
                    }));

                    acc[disease] = {
                        plotData: traces,
                        disease: disease,
                        gene: ensg_id,
                        variant: variant_id
                    };

                    return acc;
                }, {} as Record<string, DiseasePlotContainer>);

                    setBoxplotData(plotsByDisease);


            } catch (error) {
                console.error("Failed to fetch boxplot data", error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, [variant_id, ensg_id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-3">
            <Row><h2>Variant effects for {variant_id}</h2></Row>
            <Row>
                <Col xs={2}>
                    <BoxPlot plotData={boxplot_data["FSGS"]}/>
                </Col>
                <Col xs={2}>
                    <BoxPlot
                        plotData={boxplot_data["igAN"]}
                    />
                </Col>
                <Col xs={2}>
                    <BoxPlot
                        plotData={boxplot_data["IgAV"]}
                    />
                </Col>
                <Col xs={2}>
                    <BoxPlot
                        plotData={boxplot_data["MCD"]}
                    />
                </Col>
                <Col xs={2}>
                    <BoxPlot
                        plotData={boxplot_data["MN"]}
                    />
                </Col>
                <Col xs={2}>
                    <BoxPlot
                        plotData={boxplot_data["all_com"]}
                    />
                </Col>
            </Row>
        </div>
    );
};