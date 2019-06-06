const express = require('express')
const router = express.Router()
const rp = require('request-promise')
const Patient = require('../classes/Patient')
const Observation = require('../classes/Observation')
const Medication = require('../classes/Medication')
const MedicationStatement = require('../classes/MedicationStatement')
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
function patientFromRespone(r, klasa) {
  return R.pick(Object.keys(new klasy[klasa]()), r)
}

router.get('/:klasa', async function(req, res) {
  const klasa = R.replace(
    'st',
    'St',
    R.toUpper(req.params.klasa[0]) + R.toLower(req.params.klasa.substring(1, req.params.klasa.length)),
  )
  const id = req.body.id || defVals[klasa]
  const url = `http://hapi.fhir.org/baseDstu3/${klasa}/`
  const ending = '?_format=json'
  res.setHeader('Content-Type', 'application/json')
  const response = JSON.parse(await rp(url + id + ending))
  const patient = patientFromRespone(response, klasa)
  res.end(JSON.stringify(patient))
})
router.post('/:klasa', function(req, res) {
  res.send('POST route on things.')
})

module.exports = router
