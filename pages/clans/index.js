import Head from 'next/head'
import Navmenu from '../../components/Navmenu'
import Footer from '../../components/Footer'
import { Form, Button, Col, Row, Table, Container } from 'react-bootstrap'
import { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'

const clans = ({ apiUrl }) => {
  const [formTag, setFormTag] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState()

  const changeInput = (input) => {
    if (input.charAt(0) === '#') {
      setFormTag(input.slice(1))
    } else {
      setFormTag(input)
    }
  }

  const search = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.get(`${apiUrl}/clansearch/${searchQuery}`)
      setSearchResults(await res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Head>
        <title>Clans - Clash Stats</title>
      </Head>
      <Navmenu />
      <h1 className='supercell' style={{ paddingLeft: '1rem' }}>
        Clans
      </h1>
      <Row
        className='g-2 mb-5'
        style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
        <Col md>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Form.Text>Find clan by clan tag</Form.Text>

            <Form.Control
              type='text'
              className='mb-3'
              placeholder='Clan Tag #'
              required
              onChange={(e) => changeInput(e.target.value)}
            />

            <Link href={`/clans/${formTag}`}>
              <Button type='submit'>View Clan</Button>
            </Link>
          </Form>
        </Col>
        <Col md>
          <Form onSubmit={(e) => search(e)}>
            <Form.Text>Search for clan</Form.Text>

            <Form.Control
              type='text'
              className='mb-3'
              placeholder='Clan Name'
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Button type='submit'>Search</Button>
          </Form>
        </Col>
      </Row>
      {searchResults && (
        <Container>
          <Table bordered striped hover>
            <thead>
              <tr>
                <td>Name</td>
                <td>Score</td>
                <td>Location</td>
              </tr>
            </thead>
            <tbody>
              {searchResults.items.map(
                ({ name, tag, clanScore, location }, index) => (
                  <tr key={`result${index}`}>
                    <td>
                      <Link href={`/clans/${tag.slice(1)}`}>{name}</Link>
                    </td>
                    <td>{clanScore}</td>
                    <td>{location.name}</td>
                  </tr>
                )
              )}
            </tbody>
          </Table>
        </Container>
      )}
      <Footer />
    </>
  )
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      apiUrl: process.env.API_URL
    }
  }
}

export default clans
