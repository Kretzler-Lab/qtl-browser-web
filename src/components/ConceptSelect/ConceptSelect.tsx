import React, {type FC} from "react";
import { Row, Col } from 'reactstrap';
import AsyncSelect from "react-select/async";

type ConceptSelectProps = {
    selectedConcept: any
}

type ConceptSelectState = {
    inputValue: string;
}

const messages = {
    initial: "Please enter 2 or more characters to start search",
    noOption: "No results found"
}

class ConceptSelect extends React.Component<ConceptSelectProps, ConceptSelectState> {
    state: ConceptSelectState = {
        inputValue: this.props.selectedConcept
    };

    render() {
        return (
            <React.Fragment>
                <Row xs="12">
                    <Col>
                        <h5>Search</h5>
                    </Col>
                </Row>
                <Row xs="12">
                    <Col>
                        <article>
                            <AsyncSelect 
                                defaultInputValue={this.props.selectedConcept}
                                inputValue={this.state.inputValue}
                                onInputChange={(inputValue) => this.setState({inputValue: inputValue})}
                                placeholder="Please enter a gene symbol"
                                noOptionsMessage={({inputValue}) => {
                                    if (inputValue.trim().length < 2) return messages.initial; 
                                    return messages.noOption;}} />
                        </article>
                    </Col>
                </Row>
            </React.Fragment>
            )
    }
}
export default ConceptSelect;