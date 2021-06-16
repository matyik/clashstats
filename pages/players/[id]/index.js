import { useState } from 'react'
import { Container, Table, Breadcrumb, Card } from 'react-bootstrap'
import Head from 'next/head'
import axios from 'axios'
import Link from 'next/link'
import Navmenu from '../../../components/Navmenu'
import Footer from '../../../components/Footer'

const UPGRADES = [0, 2, 4, 10, 20, 50, 100, 200, 400, 800, 1000, 2000, 5000]

const Player = ({ playerData, playerChests }) => {
  const [view, setView] = useState(0)
  return (
    <>
      <Head>
        <title>{playerData.name} - Clash Stats</title>
      </Head>
      <Navmenu />
      <Container style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <h2 className='supercell gold'>{playerData.name}</h2>
        <span className='supercell secondary'>{playerData.tag}</span>
        <Breadcrumb>
          <Breadcrumb.Item active={view === 0} onClick={() => setView(0)}>
            Stats
          </Breadcrumb.Item>
          <Breadcrumb.Item active={view === 1} onClick={() => setView(1)}>
            Cards
          </Breadcrumb.Item>
          <Breadcrumb.Item active={view === 2} onClick={() => setView(2)}>
            Chests
          </Breadcrumb.Item>
        </Breadcrumb>
        {view === 0 && (
          <div>
            <p className='supercell'>{playerData.description}</p>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Clan</td>
                  <td>
                    <Link href={`/clans/${playerData.clan.tag.slice(1)}`}>
                      {playerData.clan.name}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>Level</td>
                  <td>{playerData.expLevel}</td>
                </tr>
                <tr>
                  <td>Trophies</td>
                  <td>{playerData.trophies}</td>
                </tr>
                <tr>
                  <td>Highest Trophies</td>
                  <td>{playerData.bestTrophies}</td>
                </tr>
                <tr>
                  <td>Donations</td>
                  <td>{playerData.donations}</td>
                </tr>
                <tr>
                  <td>Donations Recieved</td>
                  <td>{playerData.donationsReceived}</td>
                </tr>
                <tr>
                  <td>Wins</td>
                  <td>{playerData.wins}</td>
                </tr>
                <tr>
                  <td>Losses</td>
                  <td>{playerData.losses}</td>
                </tr>
                <tr>
                  <td>Three Crown Wins</td>
                  <td>{playerData.threeCrownWins}</td>
                </tr>
                <tr>
                  <td>W/L</td>
                  <td>{playerData.wins / playerData.losses}</td>
                </tr>
                <tr>
                  <td>Total Donations</td>
                  <td>{playerData.totalDonations}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
        {view === 1 && (
          <div className='auto-grid'>
            {playerData.cards.map(
              ({ count, iconUrls, level, name, maxLevel }, index) => (
                <Card
                  className='mb-5'
                  key={`card${index}`}
                  style={{ width: '9rem' }}>
                  <Card.Img variant='top' src={iconUrls.medium} />
                  <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Text>
                      Level {level + 13 - maxLevel}
                      {level + 13 - maxLevel !== 13 && (
                        <span>
                          {' '}
                          - {count}/{UPGRADES[level]}
                        </span>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              )
            )}
          </div>
        )}
        {view === 2 && (
          <Table hover striped>
            <thead>
              <tr>
                <td>Chest #</td>
                <td>Chest Type</td>
              </tr>
            </thead>
            <tbody>
              {playerChests.items.map(({ index, name }, chestIndex) => (
                <tr key={`chest${chestIndex}`}>
                  <td>+{index + 1}</td>
                  <td>{name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      <Footer />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const tag = context.params.id.toUpperCase()
  const res = await axios.get(`${process.env.API_URL}/players/${tag}`)
  const playerData = await res.data
  const chestRes = await axios.get(`${process.env.API_URL}/chests/${tag}`)
  const playerChests = await chestRes.data

  return {
    props: {
      playerData,
      playerChests
    }
  }
}

export default Player
