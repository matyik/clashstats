import { Navbar, Nav } from 'react-bootstrap'
import Link from 'next/link'

const Navmenu = () => {
  return (
    <Navbar
      style={{ paddingLeft: '1rem', paddingRight: '1rem' }}
      bg='light'
      expand='md'>
      <Navbar.Brand href='/'>Clash Stats</Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='mr-auto'>
          <Link href='/clans'>Clans</Link>
          <Link href='/players'>Players</Link>
          <Link href='/rankings'>Rankings</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default Navmenu
