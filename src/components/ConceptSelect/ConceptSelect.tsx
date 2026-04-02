import React, { useState } from "react";
import { Row, Col } from 'reactstrap';
import AsyncSelect from "react-select/async";
import { fetchAutocomplete } from "../../helpers/ApolloClient";
import { searchTypes, type AutocompleteResult } from "../../helpers/schema";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setGene } from "../../features/gene/geneSlice";
import { setAutocomplete } from "../../features/autocomplete/autocompleteSlice";
import { setSearchTerm } from "../../features/qtl/qtlSlice";

interface ConceptSelectProps {
    searchType: any;
}

const messages = {
    initial: "Please enter 2 or more characters to start search",
    noOption: "No results found"
};

const ConceptSelect: React.FC<ConceptSelectProps> = ({ searchType }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const autocompleteResult: AutocompleteResult | null = useAppSelector((state) => state.autocompleteReducer.autocompleteResult);
    const dispatch = useAppDispatch();

    const formatOption = (result: AutocompleteResult, searchString: string) => {
        let highlightedAliases: any = [];
        let aliasSection = undefined;
        if (result.aliases) {
            highlightedAliases = result.aliases.map((item, index) =>
                item.toLowerCase().includes(searchString.toLowerCase()) ? <strong key={item}>{index > 0 && ', '}{item}</strong> : <span key={item}>{index > 0 && ', '}{item}</span>
            );
        }
        const labelIcon = getLabelIcon(result.type);
        const highlightedValue = result.value.toLowerCase().includes(searchString.toLowerCase()) ? <strong>{result.value}</strong> : <span>{result.value}</span>;
        if ((result.aliases !== null) && (result.aliases.length !== 0)) {
            aliasSection = <span>({highlightedAliases})</span>;
        }
        return {
            label: <div>{labelIcon}{highlightedValue} {aliasSection}</div>,
            value: result
        };
    };

    const getLabelIcon = (type: string) => {
        switch (type) {
            case "cell_type":
                return <img src="/img/search-icon_cell.svg" className="me-2" alt="cell type" />;
            case "gene":
                return <img src="/img/search-icon_gene.svg" className="me-2" alt="gene" />;
            default:
                return <img src="/img/search-icon_gene.svg" className="me-2" alt="gene" />;
        }
    };

    const filterBySearchType = (results: AutocompleteResult[]) => {
        if (!searchType || searchType === 'all') {
            return results;
        } else {
            return results.filter((result) => searchType === result.type);
        }
    };

    const getOptions = async (searchString: string) => {
        const results = await fetchAutocomplete(searchString);
        if (results) {
            let filteredResults = filterBySearchType(results);
            return filteredResults.map((result) => formatOption(result, searchString));
        }
        return [];
    };

    const handleInputChange = (value: string) => {
        setInputValue(value);
        return value;
    };

    const handleSelect = (selected: any) => {
      if (selected !== null) {
        const result = selected.value as AutocompleteResult;
        if (result.type === "gene"){
            dispatch(
                setSearchTerm({
                    term: result.value, 
                    type: searchTypes.autoComplete
                })
            );
            dispatch(setAutocomplete(result));
        }
      }
    }

    return (
        <React.Fragment>
            <Row xs="12">
                <Col>
                    <h5>Search by gene</h5>
                </Col>
            </Row>
            <Row xs="12">
                <Col>
                    <article>
                        <AsyncSelect
                            defaultInputValue={""}
                            inputValue={inputValue}
                            loadOptions={getOptions}
                            onInputChange={handleInputChange}
                            onChange={handleSelect}
                            placeholder={autocompleteResult?.value || "Please enter a gene symbol"}
                            noOptionsMessage={({ inputValue }) => {
                                if (inputValue.trim().length < 2) return messages.initial;
                                return messages.noOption;
                            }}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 10 }) }}
                        />
                    </article>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default ConceptSelect;