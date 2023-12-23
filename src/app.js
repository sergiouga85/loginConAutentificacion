import express from 'express'
import {PORT, MONGODB_CNX_STR} from './config.js'
import {engine} from 'express-handlebars'
import mongoose from 'mongoose'
import {sesiones} from './middlewares/sesiones.js'
import {autenticacion} from './middlewares/passport.js'
import { apiRouter } from './routers/apirest.router.js'
import { webRouter } from './routers/web.router.js'
import bodyParser from 'body-parser'

//const bodyParser = require("body-parser")



await mongoose.connect(MONGODB_CNX_STR)
console.log(`conectado ala Base de datos en:${MONGODB_CNX_STR}`)

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.engine('handlebars', engine())
app.use('/static', express.static('./static'))


app.use(sesiones)
app.use(autenticacion)
app.use('/api',apiRouter)
app.use('/',webRouter)



app.listen(PORT, () => console.log(`servidor ecuchando peticiones en puerto: ${PORT}`))



