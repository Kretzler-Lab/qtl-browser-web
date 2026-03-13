import React, { useState, type KeyboardEventHandler } from "react";
import { Row, Col } from 'reactstrap';
import AsyncSelect from "react-select/async";

const SNPSelect: React.FC = () => {
    const [inputValue, setInputValue] = useState<string>("");
    const [value, setValue] = useState<string>("");

    const handleKeyDown: KeyboardEventHandler = (event) => {
        if (!inputValue) return;
        switch (event.key) {
        case 'Enter':
            setValue(inputValue);
            setInputValue('');
            event.preventDefault();
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
                            placeholder={<span>Enter SNP location, e.g. <i>chr4-108912965</i></span>}
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