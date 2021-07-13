const path = require('path')
const express = require("express")
const app = express()
const port = 3000

app.use('/', express.static(path.join(__dirname, 'dist')))

app.listen(port, () => {
  console.log(`tictactoe listening on port ${port}`)
})