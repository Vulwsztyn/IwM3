const axios = require('axios')

const { Curl } = require('node-libcurl')
var unirest = require('unirest')
// const curl = new (require('curl-request'))()
const express = require('express')
const router = express.Router()
const rp = require('request-promise')
const Patient = require('../classes/Patient')
const Observation = require('../classes/Observation')
const Medication = require('../classes/Medication')
const MedicationStatement = require('../classes/MedicationStatement')
const pug = require('pug')
const https = require('https')
const request = require('request')
const http = require('http')
const klasy = {
  Patient: Patient,
  Observation: Observation,
  Medication: Medication,
  MedicationStatement: MedicationStatement,
}
const defVals = {
  Patient: '1656328',
  Observation: '295694',
  Medication: '1946955',
  MedicationStatement: '1952915',
}
const R = require('ramda')
function patientFromRespone(r, ms, obs) {
  let wynik = R.pick(Object.keys(new Patient()), r)
  wynik = { ...wynik, MedicationStatements: ms, Observations: obs }
  return wynik
}
function lista(r, klasa, dateFrom, dateTo) {
  console.log(dateFrom, dateTo)
  const wynik = []
  const obj = new klasy[klasa]()
  for (i of r.entry) {
    if (dateFrom && dateTo) {
      const dF = new Date(dateFrom)
      const dT = new Date(dateTo)
      const d = new Date(i.resource.effectiveDateTime)
      if (d >= dF && d <= dT) {
        wynik.push(R.pick(Object.keys(obj), i.resource))
      }
    } else {
      wynik.push(R.pick(Object.keys(obj), i.resource))
    }
  }
  return wynik
}

router.get('/Patient/:id', async function(req, res, next) {
  const idObs = req.query.idObs
  let listaStatementow = []
  let listaObservacji = []
  const id = req.params.id || 1716558
  const url = `http://hapi.fhir.org/baseDstu3/Patient/${id}?_format=json`
  console.log(url)
  const patientJSON = JSON.parse(await rp(url))

  try {
    const MSurl = `http://hapi.fhir.org/baseDstu3/MedicationRequest?patient=${id}&_pretty=true`
    listaStatementow = lista(JSON.parse(await rp(MSurl)), 'MedicationStatement')
  } catch (e) {}
  try {
    const Ourl = `http://hapi.fhir.org/baseDstu3/Observation?subject=${id}&_pretty=true`
    listaObservacji = lista(JSON.parse(await rp(Ourl)), 'Observation', req.query.dateFrom, req.query.dateTo)
  } catch (e) {}
  // console.log(listaStatementow)
  const patient = patientFromRespone(patientJSON, listaStatementow, listaObservacji)
  res.setHeader('Content-type', 'text/html')
  // console.log(patient)
  // console.log(listaStatementow[0].medicationCodeableConcept.text)
  const edit = req.query.edit
  if (!idObs) {
    res.render('patient.pug', { data: patient, edit })
  } else {
    let daneDoWykresu = []
    for (let i = 0; i < listaObservacji.length; i++) {
      if (listaObservacji[i].code.text === listaObservacji[idObs].code.text) {
        let obj = {
          date: listaObservacji[i].effectiveDateTime,
          value: listaObservacji[i].valueQuantity.value,
        }
        daneDoWykresu.push(obj)
      }
    }
    // console.log(daneDoWykresu)

    res.render('observation.pug', { data: patient, observationIndex: idObs, graphData: daneDoWykresu, edit })
  }
})

router.get('/', async function(req, res) {
  let url = ''
  if (req.query.name) {
    url = `http://hapi.fhir.org/baseDstu3/Patient?name=${req.query.name}&_pretty=true`
  } else {
    url = `http://hapi.fhir.org/baseDstu3/Patient?_pretty=true`
  }
  console.log(url)
  const patientJSON = JSON.parse(await rp(url))
  let patientList = patientJSON.entry
  console.log(patientList)
  res.render('index.pug', { patientList })
})

router.post('/Patient/:id', async function(req, res) {
  const id = req.params.id
  const url = `http://hapi.fhir.org/baseDstu3/Patient/${id}?_format=json`
  console.log(url)
  const patient = JSON.parse(await rp(url))
  if (req.body.nameEdit) {
    patient.name[0].given = [req.body.nameEdit]
  }
  if (req.body.surnameEdit) {
    patient.name[0].family = req.body.surnameEdit
  }
  if (req.body.gender) patient.gender = req.body.gender

  const patientJSON = JSON.stringify(patient)

  await axios
    .put(`http://hapi.fhir.org/baseDstu3/Patient/${id}`, patientJSON, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'PostmanRuntime/7.13.0',
        Accept: '*/*',
        'Cache-Control': 'no-cache',
        'Postman-Token': '844d9426-92f1-49a9-852b-048d2786e097,f7f4e6f9-c1d2-461f-a974-2252bec4b216',
        Host: 'hapi.fhir.org',
        'accept-encoding': 'gzip, deflate',
        'content-length': patientJSON.length,
        Connection: 'keep-alive',
        'cache-control': 'no-cache',
      },
    })
    .then(r => console.log(r.status))
    .catch(e => console.log(e))

  res.redirect('/Patient/' + id)
})

module.exports = router
