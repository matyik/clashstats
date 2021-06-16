import { useState } from 'react'
import { Container, Table, Breadcrumb } from 'react-bootstrap'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import Navmenu from '../../../components/Navmenu'
import Footer from '../../../components/Footer'

const Clan = ({ clanData, clanWars }) => {
  const [view, setView] = useState(0)
  return (
    <>
      <Head>
        <title>SussyScorpians - Clash Stats</title>
      </Head>
      <Navmenu />
      <Container style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <h2 className='supercell gold'>{clanData.name}</h2>
        <span className='supercell secondary'>{clanData.tag}</span>
        <Breadcrumb>
          <Breadcrumb.Item active={view === 0} onClick={() => setView(0)}>
            Stats
          </Breadcrumb.Item>
          <Breadcrumb.Item active={view === 1} onClick={() => setView(1)}>
            Players
          </Breadcrumb.Item>
          <Breadcrumb.Item active={view === 2} onClick={() => setView(2)}>
            War
          </Breadcrumb.Item>
        </Breadcrumb>
        {view === 0 && (
          <div>
            <p className='supercell'>{clanData.description}</p>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <td>Score</td>
                  <td>{clanData.clanScore}</td>
                </tr>
                <tr>
                  <td>Type</td>
                  <td>
                    {clanData.type.charAt(0).toUpperCase() +
                      clanData.type.slice(1)}
                  </td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>{clanData.location.name}</td>
                </tr>
                <tr>
                  <td>War Trophies</td>
                  <td>{clanData.clanWarTrophies}</td>
                </tr>
                <tr>
                  <td>Members</td>
                  <td>{clanData.members}</td>
                </tr>
                <tr>
                  <td>Required Trophies</td>
                  <td>{clanData.requiredTrophies}</td>
                </tr>
                <tr>
                  <td>Donations per Week</td>
                  <td>{clanData.donationsPerWeek}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
        {view === 1 && (
          <Table striped bordered hover size='md'>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Role</th>
                <th>Donations</th>
                <th>Last Seen (UTC)</th>
                <th>Trophies</th>
              </tr>
            </thead>
            <tbody>
              {clanData.memberList.map(
                (
                  { clanRank, name, role, donations, lastSeen, trophies, tag },
                  index
                ) => (
                  <tr key={index}>
                    <td>{clanRank}</td>
                    <td>
                      <Link href={`/players/${tag.slice(1)}`}>{name}</Link>
                    </td>
                    <td>{role.charAt(0).toUpperCase() + role.slice(1)}</td>
                    <td>{donations}</td>
                    <td>{`${lastSeen.substring(0, 4)} ${lastSeen.substring(
                      4,
                      6
                    )}-${lastSeen.substring(6, 8)} ${lastSeen.substring(
                      9,
                      11
                    )}:${lastSeen.substring(11, 13)}`}</td>
                    <td>{trophies}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        )}
        {view === 2 && (
          <div>
            {clanWars.items.map(({ createdDate, standings }, index) => (
              <div key={`war${index}`}>
                <h4 className='supercell primary'>{`${createdDate.substring(
                  0,
                  4
                )} ${createdDate.substring(4, 6)}-${createdDate.substring(
                  6,
                  8
                )} ${createdDate.substring(9, 11)}:${createdDate.substring(
                  11,
                  13
                )}`}</h4>
                <Table className='mb-3' hover striped>
                  <thead>
                    <tr>
                      <td>Place</td>
                      <td>Clan</td>
                    </tr>
                  </thead>
                  <tbody>
                    {standings.map(({ clan, rank }, index) => (
                      <tr key={`clan${index}`}>
                        <td>{rank}</td>
                        <td>
                          <Link href={`/clans/${clan.tag.slice(1)}`}>
                            {clan.name}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            ))}
          </div>
        )}
      </Container>
      <Footer />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const tag = context.params.id.toUpperCase()
  const res = await axios.get(`${process.env.API_URL}/clans/${tag}`)
  const clanData = await res.data

  const warRes = await axios.get(`${process.env.API_URL}/racelog/${tag}`)
  const clanWars = await warRes.data

  return {
    props: {
      clanData,
      clanWars
    }
  }
}

export default Clan
