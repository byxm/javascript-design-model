const webpack = require('webpack')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleWare = require('webpack-hot-middleware')
const bodyParser = require('body-parser')

const app = express()
const config = require('./webpack.config')
const compiler = webpack(config)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats:{
      colors: true,
      chunks: false
    },
    progress: true,
    inline: true,
    hot:true,
  })
)

app.use(webpackHotMiddleWare(compiler))

app.use(express.static(__dirname + '/src'))

app.use(bodyParser.json())

const router = express.Router()


app.use(router)


const port = process.env.PORT || 8000

module.exports = app.listen(port,()=>{
	console.log(`Server listening on http://localhost:${port}`);
})

