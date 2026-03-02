import { useEffect, useState} from 'react';
import {Row, Col, Spinner} from 'reactstrap';
import {BoxPlot} from "./BoxPlot.tsx";
import type {Data} from 'plotly.js';
import {fetchBoxplotData} from "../../helpers/ApolloClient.tsx";
import type {BoxplotVizData} from "../../helpers/schema.tsx";
import { useAppSelector } from '../../app/hooks.ts';
import {VariantInfoTable} from "./VariantInfoTable.tsx";

export interface DiseasePlotContainer {
    plotData: Data[];
    disease: string;
    gene: string;
    variant: string;
}

export const VariantEffectsView = () => {

    const [boxplot_data, setBoxplotData] = useState<Record<string, DiseasePlotContainer>>({});
    const [loading, setLoading] = useState(true);
    const gene = useAppSelector((state) => state.geneReducer.geneResult);
    const [qtlInfoArray, setQtlInfoArray] = useState<any[]>([]);
    const variant_id = useAppSelector((state) => state.variantReducer.variant.variantId);
    const ensg_id = useAppSelector((state) => state.variantReducer.variant.ensgId);



    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const box_data: BoxplotVizData[] = await fetchBoxplotData(variant_id, ensg_id);

                if (!box_data) {
                    setQtlInfoArray([]);
                    return {};
                }

                // Build QTL info array for table using correct structure
                const qtlInfo = box_data.map((item) => ({
                    gene: item.qtl?.id?.ensgId,
                    id: {
                        variantId: item.qtl?.id?.variantId,
                        dx: item.qtl?.id?.dx,
                        ensgId: item.qtl?.id?.ensgId
                    },
                    tssDistance: item.qtl?.tssDistance,
                    maf: item.qtl?.maf,
                    pval: item.qtl?.pval,
                    slope: item.qtl?.slope,
                    ggPatients: Array.isArray(item.groups) ? (item.groups.find(g => g.genotype === "0")?.count ?? undefined) : undefined,
                    gaPatients: Array.isArray(item.groups) ? (item.groups.find(g => g.genotype === "1")?.count ?? undefined) : undefined,
                    aaPatients: Array.isArray(item.groups) ? (item.groups.find(g => g.genotype === "2")?.count ?? undefined) : undefined,
                    disease: item.disease
                }));
                setQtlInfoArray(qtlInfo);

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
        return <div className="text-center my-4">
            <Spinner color="primary" />
        </div>
    }

    return (
        <div className="container mt-3">
            <Row xs={12}>
              <Col xs={8} style={{"display":"flex", "alignItems":"center"}}>
                <h5>Variant effects for {variant_id}</h5>
              </Col>
              <Col xs={4} className="text-end text-primary ">
                <button onClick={() => {window.history.back()}} type='button' className='btn btn-link'>
                  <h5><span style={{"fontSize":"26px"}}>&larr;</span> Results for {gene}</h5></button>
              </Col>
              </Row>
            <Row className="mb-5">
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
                        plotData={boxplot_data["all_co"]}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={12}>
                    <VariantInfoTable plotData={qtlInfoArray} />
                </Col>
            </Row>
        </div>
    );
};