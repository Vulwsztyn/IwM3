const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
const patientIDs = [
  1656328,
  1656327,
  1656300,
  1656311,
  1656316,
  // z obserwacjami
  1909448, // obserwacja 1909478
  295670, // obserwacja 295694
  // z medication statementami
  1952851, // statement 1952915
]

const observationIDs = [
  1909478, // pacjent 1909448
  434055, // bez pacjenta
  295694, // pacjent 295670
]

const medicationStatementIDs = [
  1952915, // pacjent 1952851
  1952838,
  1952182,
]

const medicationIDs = [1946955]

const router = require('./routes/router')

app.use('/', router)

app.listen(3000)
console.log('app listens on localhost:3000')
