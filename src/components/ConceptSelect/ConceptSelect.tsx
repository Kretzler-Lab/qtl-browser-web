import React from "react";
import { Row, Col } from 'reactstrap';
import AsyncSelect from "react-select/async";
import { fetchAutoComplete } from "../../helpers/ApolloClient";
import type { AutoCompleteResult } from "../../helpers/schema";

interface ConceptSelectProps {
    selectedConcept: any;
    searchType: any;
}

type ConceptSelectState = {
    inputValue: string;
    searchType: string;
}

const messages = {
    initial: "Please enter 2 or more characters to start search",
    noOption: "No results found"
}


class ConceptSelect extends React.Component<ConceptSelectProps, ConceptSelectState> {

    constructor(props: ConceptSelectProps) {
        super(props);
        this.state = {
            inputValue: this.props.selectedConcept.value,
            searchType: this.props.searchType
        }
    }
    
    formatOption = (result: AutoCompleteResult, searchString: string) => {
        let highlightedAliases : any = [];
        let aliasSection = undefined;
        if (result.aliases) {
            highlightedAliases = result.aliases.map((item, index) =>
                item.toLowerCase().includes(searchString.toLowerCase()) ? <strong>{index > 0 && ', '}{item}</strong> : <span>{index > 0 && ', '}{item}</span>
                , this);
        }
        const labelIcon = this.getLabelIcon(result.type);
        const highlightedValue = result.value.toLowerCase().includes(searchString.toLowerCase()) ? <strong>{result.value}</strong> : <span>{result.value}</span>;
        if ((result.aliases !== null) && (result.aliases.length !== 0)) {
            aliasSection = <span>({highlightedAliases})</span>
        }
        return {
            label: <div>{labelIcon}
                {highlightedValue} {aliasSection}</div>,
            value: result
        }
    };

    
    getLabelIcon = (type: string) => {
        switch (type) {
            case "cell_type":
                return <img src="/img/search-icon_cell.svg" className="me-2" alt="cell type" />;
            case "gene":
                return <img src="/img/search-icon_gene.svg" className="me-2" alt="gene" />;
            default:
                return <img src="/img/search-icon_gene.svg" className="me-2" alt="gene" />;
        }
    };

    filterBySearchType = (results: AutoCompleteResult[]) => {
        if(!this.props.searchType || this.props.searchType === 'all') {
            return results;
        } else {
            return results.filter((result) => this.props.searchType === result.type)
        }
    }

    getOptions = async (searchString: string) => {
        const results = await fetchAutoComplete(searchString);
        if (results) {
            let filteredResults = await this.filterBySearchType(results);
            return filteredResults.map((result) => this.formatOption(result, searchString), this);
        }
        return [];
    }

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
                                defaultInputValue={this.props.selectedConcept.value}
                                inputValue={this.state.inputValue}
                                loadOptions={this.getOptions}
                                onInputChange={(inputValue) => this.setState({inputValue: inputValue})}
                                placeholder="Please enter a gene symbol"
                                noOptionsMessage={({inputValue}) => {
                                    if (inputValue.trim().length < 2) return messages.initial; 
                                    return messages.noOption;}}
                                menuPortalTarget={document.body}
                                styles={{ menuPortal: base => ({ ...base, zIndex: 10 }) }} />
                        </article>
                    </Col>
                </Row>
            </React.Fragment>
            )
    }
}
export default ConceptSelect;