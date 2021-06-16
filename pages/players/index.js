import Head from 'next/head'
import Navmenu from '../../components/Navmenu'
import { Form, Button, Container } from 'react-bootstrap'
import { useState } from 'react'
import Link from 'next/link'
import Footer from '../../components/Footer'

const players = () => {
  const [formTag, setFormTag] = useState('')

  const changeInput = (input) => {
    if (input.charAt(0) === '#') {
      setFormTag(input.slice(1))
    } else {
      setFormTag(input)
    }
  }
  return (
    <>
      <Head>
        <title>Players - Clash Stats</title>
      </Head>
      <Navmenu />
      <Container>
        <h1 className='supercell'>Players</h1>

        <Form onSubmit={(e) => e.preventDefault()}>
          <Form.Text>Find by tag</Form.Text>
          <Form.Control
            type='text'
            className='mb-3'
            placeholder='Player Tag #'
            required
            onChange={(e) => changeInput(e.target.value)}
          />
          <Link href={`/players/${formTag}`}>
            <Button type='submit'>View Player</Button>
          </Link>
        </Form>
      </Container>
      <Footer />
    </>
  )
}

export default players
