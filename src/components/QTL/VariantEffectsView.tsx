import type {FC} from 'react';
import {Row, Col} from 'reactstrap';
import {BoxPlot} from "./BoxPlot.tsx";

interface VariantEffectsViewProps {
    variant_id: string;
}

export const VariantEffectsView: FC<VariantEffectsViewProps> = ({variant_id}) => {
    const dataBox1 = [0.5, 0.7, 1.2, 1.5, 2.0, 2.2, 2.5, 3.0, 3.5, 4.0];
    const dataBox2 = [2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5];
    const dataBox3 = [4.0, 4.2, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0];

    const box_data = [
        {
            y: dataBox1,
            type: 'box',
            name: 'GA', // Label for the first box
            boxpoints: 'all', // Show all individual data points
            jitter: 0.3, // Add jitter to points for better visibility
        },
        {
            y: dataBox2,
            type: 'box',
            name: 'GG', // Label for the second box
            boxpoints: 'all',
            jitter: 0.3,
        },
        {
            y: dataBox3,
            type: 'box',
            name: 'AA', // Label for the third box
            boxpoints: 'all',
            jitter: 0.3,
        },
    ]

    return (
        <div className="container mt-3">
            <Row><h2>Variant effects for {variant_id}</h2></Row>
            <Row>
                <Col xs={2}>
                    <BoxPlot
                        data = {box_data}
                        />
                </Col>
                <Col xs={2}>
                    <BoxPlot
                        data = {box_data}
                    />
                </Col>
                <Col xs={2}>
                    <BoxPlot
                        data = {box_data}
                    />
                </Col>
                <Col xs={2}>
                    <BoxPlot
                        data = {box_data}
                    />
                </Col>
                <Col xs={2}>
                    <BoxPlot
                        data = {box_data}
                    />
                </Col>
                <Col xs={2}>
                    <BoxPlot
                        data = {box_data}
                    />
                </Col>
            </Row>
        </div>
    );
};