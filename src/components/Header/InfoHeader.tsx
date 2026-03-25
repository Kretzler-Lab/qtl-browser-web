import { useEffect, useState }from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InfoHeader = (props: any) => {
    const { displayName, enableSorting, column, setSort, infoIcon, api } = props;
    const [ sortState, setSortState ] = useState(column.getSort());

    useEffect(() => {
        const listener = () => {
            setSortState(column.getSort());
        }

        api.addEventListener('sortChanged', listener);
        return () => {
            api.removeEventListener('sortChanged', listener);
        }
    }, [api, column]);

    const toggleSort = () => {
        const nextSort = sortState === 'asc' ? 'desc' : sortState === 'desc' ? null : 'asc';
        setSort(nextSort, false);
        api.onSortChanged();
    }

    const getSortArrow = () => {
        if (sortState === 'asc') {
            return ( 
                <span className="icon-info ag-icon ag-icon-asc" role="presentation" id='sortUp' unselectable="on"></span>
            )
        } else if (sortState === 'desc') {
            return (
                <span className="icon-info ag-icon ag-icon-desc" role="presentation" id='sortDown' unselectable="on"></span>
            );
        }
    };

    let headerIcon = null;
    if (infoIcon && infoIcon === true) {
        headerIcon = (
            <span className="icon-info"><FontAwesomeIcon className='kpmp-light-blue' id='fold-change-info' icon={faInfoCircle} /></span>
        )
    }

    return (
        <div style={{ whiteSpace: 'normal', lineHeight: 1.2, display: 'flex', alignItems: 'center', cursor: enableSorting ? 'pointer' : 'default' }} 
            onClick={enableSorting ? toggleSort : undefined}>
        <span> {displayName}  {headerIcon}</span>
        <span style={{ marginRight: 4 }}>{getSortArrow()}</span>
        </div>
    );

}

export default InfoHeader;