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

export function NavBar () {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleNavigation = (label: string) => {
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
              <Link to='/' className="navbar-header d-flex align-items-center text-decoration-none" onClick={() => handleNavigation('Home')}>
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