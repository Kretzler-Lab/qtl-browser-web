import { CardFooter, Col, Row } from "reactstrap";

export function Footer () {
    return (
        <CardFooter id="cardfooter">
            <Row>
                <Col className="col-lg-5">
                    <a href="https://www.curegn.org" target="_blank">
                        <img src="https://cdn.prod.website-files.com/5e81f24f957e0a9938366a4c/5e824a6c1dfa0b49f3d74abf_logo_CureGN.svg" alt="CureGN Logo" className="logo" height="50" />
                    </a>
                    <p>
                        &copy; Cure Glomerulonephropathy Network
                    </p>
                </Col>
                <Col className="col-lg-7">
                    <p>
                        CureGN is supported by the National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK) at the National Institutes for Health (NIH): UM1DK100845, UM1DK100846, UM1DK100876, UM1DK100866, and UM1DK100867.
                    </p>
                    <p>
                        Problems or questions? Contact us at <a target="_blank" href="mailto:curegn-application-help@umich.edu">curegn-application-help@umich.edu</a>.
                    </p>
                </Col>
            </Row>
        </CardFooter>
    )
}