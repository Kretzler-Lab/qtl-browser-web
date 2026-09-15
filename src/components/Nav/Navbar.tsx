import {
    Navbar,
    NavbarBrand,
    Col,
    NavItem,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
import { Link } from 'react-router';
import {useState} from "react";
import { handleGoogleAnayticsEvent } from "../../helpers/googleAnalyticsHelpers";
import { useAppDispatch } from '../../app/hooks';
import { setQtl, setSearchTerm } from '../../features/qtl/qtlSlice';
import { setAutocomplete } from '../../features/autocomplete/autocompleteSlice';
import { setGene } from '../../features/gene/geneSlice';
import type { Gene } from '../../helpers/schema';
import { setVariant } from '../../features/variant/variantSlice';

export function NavBar () {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useAppDispatch();

    const handleNavigation = (label: string, reset: boolean = false) => {
        if(reset) {
            dispatch(setSearchTerm(null));
            dispatch(setQtl(null));
            dispatch(setAutocomplete(null));
            dispatch(setGene("" as Gene));
            dispatch(setVariant({
                ensgId: "",
                variantId: "",
                dx: "" 
            }));
        }
        handleGoogleAnayticsEvent('Navigation', 'Navbar Click', label);
    };

    const handleMouseEnter = () => {
        setDropdownOpen(true)
    }

    const handleMouseLeave = () => {
        setDropdownOpen(false)
    }

    const dropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    }

  return (
      <Navbar id='navbar' className='px-1 py-1'>
          <Col sm={12} className="d-flex align-items-center">
              <Link to='/' reloadDocument={true} className="navbar-header d-flex align-items-center text-decoration-none" onClick={() => handleNavigation('Home', true)}>
                  <NavbarBrand className="d-flex align-items-center">
                      <img src='/img/CureGN_logo.png' alt='logo' className='logo'/>
                        <span className='ml-2 text-dark' id="nav-title" style={{ whiteSpace: 'nowrap' }}>QTL Browser</span>
                  </NavbarBrand>
              </Link>

              <NavItem className="nav-icon px-1 help-menu list-unstyled ms-auto">
                  <Dropdown isOpen={dropdownOpen} toggle={dropdownToggle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                      <DropdownToggle caret>Help</DropdownToggle>
                      <DropdownMenu>
                          <DropdownItem tag="a" href="/about" target="_blank" onClick={() => handleNavigation('About')}>About</DropdownItem>
                      </DropdownMenu>
                  </Dropdown>
              </NavItem>
          </Col>
      </Navbar>
  )
}