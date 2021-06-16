import axios from 'axios'

export default async function handler(req, res) {
  try {
    const ress = await axios.get(
      `https://api.clashroyale.com/v1/players/%23${req.query.tag}`,
      {
        headers: {
          authorization: `Bearer ${process.env.API_KEY}`
        }
      }
    )
    res.json(ress.data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'check server console' })
  }
}
