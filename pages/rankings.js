import Head from 'next/head'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { Container, Dropdown, Table, Row, Col } from 'react-bootstrap'
import Navmenu from '../components/Navmenu'
import Footer from '../components/Footer'

const rankings = ({ locations, apiUrl }) => {
  const [region, setRegion] = useState({
    id: 57000249,
    name: 'United States'
  })
  const [rankData, setRankData] = useState()
  const [filterType, setFilterType] = useState('players')

  useEffect(async () => {
    const res = await axios.get(`${apiUrl}/rankings/${region.id}/${filterType}`)
    setRankData(await res.data)
  }, [region, filterType])
  return (
    <>
      <Head>
        <title>Rankings - Clash Stats</title>
      </Head>
      <Navmenu />
      <Container>
        <h1 className='supercell'>Rankings</h1>
        <Row>
          <Col sm>
            <Dropdown className='p-3'>
              <Dropdown.Toggle id='dropdown-basic'>
                {region.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {locations.map(({ name, id }, index) => (
                  <Dropdown.Item
                    key={`option${index}`}
                    onClick={() => setRegion({ id, name })}>
                    {name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col sm>
            <Dropdown className='p-3'>
              <Dropdown.Toggle id='dropdown-basic'>
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFilterType('players')}>
                  Players
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setFilterType('clans')}>
                  Clans
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        {rankData && (
          <Table hover bordered striped>
            <thead>
              {filterType === 'players' ? (
                <tr>
                  <td>Rank</td>
                  <td>Name</td>
                  <td>Clan</td>
                  <td>Trophies</td>
                </tr>
              ) : (
                <tr>
                  <td>Rank</td>
                  <td>Name</td>
                  <td>Members</td>
                  <td>Trophies</td>
                </tr>
              )}
            </thead>
            <tbody>
              {filterType === 'players' &&
                rankData.items.map(
                  ({ rank, name, clan, trophies, tag }, index) => (
                    <tr key={`rank${index}`}>
                      <td>{rank}</td>
                      <td>
                        <Link href={`/players/${tag.slice(1)}`}>{name}</Link>
                      </td>
                      <td>
                        {clan && (
                          <Link href={`/clans/${clan.tag.slice(1)}`}>
                            {clan.name}
                          </Link>
                        )}
                      </td>
                      <td>{trophies}</td>
                    </tr>
                  )
                )}
              {filterType === 'clans' &&
                rankData.items.map(
                  ({ clanScore, tag, rank, members, name }, index) => (
                    <tr key={`clanrank${index}`}>
                      <td>{rank}</td>
                      <td>
                        <Link href={`/clans/${tag.slice(1)}`}>{name}</Link>
                      </td>
                      <td>{members}</td>
                      <td>{clanScore}</td>
                    </tr>
                  )
                )}
            </tbody>
          </Table>
        )}
      </Container>
      <Footer />
    </>
  )
}

export const getServerSideProps = async (context) => {
  const apiUrl = process.env.API_URL
  const res = await axios.get(`${apiUrl}/locations`)
  const locations = await res.data

  return {
    props: {
      locations,
      apiUrl
    }
  }
}

export default rankings
