const port = 3000
const express = require('express')
//Раутера е модул
const indexRouter = require('./routing')

const app = express()

//изнасяне на конфигурацията в друг файл за да не стане претрупано
require('./config/express')(app)

//клиента праща на сървъра
app.use(express.json())
//за да разбере данните сървъра, без това ще е undefined
app.use(express.urlencoded({ extended: true }))

//Раутера казва кой екшън или контролер да бъде изпълнен
//кой рекуест от кой ще бъде обслужен
app.use('/', indexRouter)

app.listen(port, console.log(`Listening on port ${port}! Now its up to you...`))