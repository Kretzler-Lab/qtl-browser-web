import React, { useState, type KeyboardEventHandler } from "react";
import { Row, Col } from 'reactstrap';
import AsyncSelect from "react-select/async";
import { fetchFindBySnpLocation } from "../../helpers/ApolloClient";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setQtl, setSearchTerm } from "../../features/qtl/qtlSlice";
import { searchTypes, type searchTerm } from "../../helpers/schema";
import { handleGoogleAnayticsEvent } from "../../helpers/googleAnalyticsHelpers";
import { setAutocomplete } from "../../features/autocomplete/autocompleteSlice";

const SNPSelect: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const searchTerm: searchTerm | null = useAppSelector((state) => state.qtlReducer?.searchTerm);
    const dispatch = useAppDispatch();

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;
        switch (event.key) {
        case 'Enter':
            setValue(inputValue);
            setInputValue('');
            event.preventDefault();
            handleSelect(inputValue);
        }
    };


    const handleSelect = async (searchString: string) => {
        const results = await fetchFindBySnpLocation(searchString);
        if (results) {
            dispatch(
                setSearchTerm({
                    term: inputValue, 
                    type: searchTypes.snp
                })
            );
            handleGoogleAnayticsEvent('Search', 'SNP Search', inputValue);
            dispatch(setQtl(results));
            dispatch(setAutocomplete(null));
        }
    };

    return (
        <React.Fragment>
            <Row xs="12">
                <Col>
                    <h5>Search by SNP</h5>
                </Col>
            </Row>
            <Row xs="12">
                <Col>
                    <article>
                        <AsyncSelect
                            components={{DropdownIndicator: null}}
                            menuIsOpen={false}
                            value={value}
                            inputValue={inputValue}
                            onInputChange={(newValue) => setInputValue(newValue)}
                            onChange={(newValue: any) => setValue(newValue)}
                            onKeyDown={handleKeyDown}
                            placeholder={((searchTerm?.type == searchTypes.snp && searchTerm?.term) || <span>Enter SNP location, e.g. <i>chr4-108912965</i></span>)}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 10 }) }}
                        />
                    </article>
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default SNPSelect;