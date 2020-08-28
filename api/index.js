const { Client } = require('pg')
  ; const express = require('express')
  ; const app = express()

  ; const dbConfig = {
    user: 'postgres'
    , password: 'example'
    , host: '172.21.0.3'
    , database: 'store'
    , port: 5432
    , ssl: false
  }

  ; const client = new Client(dbConfig)
  ; client.connect()

  ; const PORT = 3000

  ; app.use(express.json())

  ; app.get('/menu', async (req, res) => {
    const result = await client.query({
      text: 'select * from menu;'
    })

      ; res.send(result.rows)
  })

  ; app.get('/menu/:id', async (req, res) => {
    const result = await client.query({
      text: 'select * from menu where id = $1;',
      values: [req.params.id]
    })
      ; res.send(result.rows[0])
  })

  ; app.post('/menu', async (req, res) => {
    const result = await client.query({
      text: 'insert into menu (category, name, price) values ($1, $2, $3) returning *;',
      values: [req.body.category, req.body.name, req.body.price]
    })
      ; res.send(result.rows[0])
  })

  ; app.put('/menu/:id', async (req, res) => {
    const result = await client.query({
      text: 'update menu set category = $1, name =$2, price =$3 where id= $4 returning *;',
      values: [req.body.category, req.body.name, req.body.price, req.params.id]
    })
      ; res.send(result.rows[0])
  })

  ; app.delete('/menu/:id', async (req, res) => {
    const result = await client.query({
      text: 'delete from menu where id = $1;',
      values: [req.params.id]
    })

      ; res.send(result.rows[0])
  })

  ; app.listen(PORT, () => console.log(`API running on port ${PORT} ...`))