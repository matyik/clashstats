import Head from 'next/head'
import Navmenu from '../components/Navmenu'
import Footer from '../components/Footer'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Head>
        <title>Clash Stats</title>
        <meta name='description' content='No ads, no BS. Just Clash Stats' />
      </Head>
      <Navmenu />
      <Container>
        <Row>
          <Col sm>
            <Card className='mb-3' style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Players</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  Player Stats
                </Card.Subtitle>
                <Card.Text>
                  Get a player's stats, cards, and upcoming chests
                </Card.Text>
                <Link href='/players'>
                  <Button>Go</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col sm>
            <Card className='mb-3' style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Clans</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  Clan Stats
                </Card.Subtitle>
                <Card.Text>
                  Get a clan's stats, members, and river race logs
                </Card.Text>
                <Link href='/clans'>
                  <Button>Go</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col sm>
            <Card className='mb-3' style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Title>Rankings</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  Leaderboards
                </Card.Subtitle>
                <Card.Text>
                  Rankings for clans and players by location
                </Card.Text>
                <Link href='/rankings'>
                  <Button>Go</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  )
}
