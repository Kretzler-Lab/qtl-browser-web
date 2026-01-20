import {Navbar, NavbarBrand, Col } from 'reactstrap';
import { Link } from 'react-router';
export function NavBar () {
  return (
    <Navbar id='navbar' className='px-1 py-1'>
      <Col sm={6}>
      <Link to='/' className="navbar-header">
        <NavbarBrand className="d-flex align-items-center">
          <img src='/img/CureGN_logo.png' alt='Cure Glomerulonephropathy Quantitative Trait Locus' className='logo'/>
          <span className='ml-2 text-dark' id="nav-title">Cure Glomerulonephropathy Quantitative Trait Locus Browser</span>
        </NavbarBrand>
        </Link>
      </Col>
    </Navbar>
  )
}