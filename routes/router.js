const express = require('express');
const router = express.Router();
const rp = require('request-promise');
const Patient = require('../classes/Patient');
const Observation = require('../classes/Observation');
const Medication = require('../classes/Medication');
const MedicationStatement = require('../classes/MedicationStatement');
const klasy = {
  Patient: Patient,
  Observation: Observation,
  Medication: Medication,
  MedicationStatement: MedicationStatement,
};
const defVals = {
  Patient: '1656328',
  Observation: '295694',
  Medication: '1946955',
  MedicationStatement: '1952915',
};
const R = require('ramda');
function patientFromRespone(r, ms,obs) {
  let wynik = R.pick(Object.keys(new Patient()), r);
  wynik= {...wynik,MedicationStatements:ms,Observations: obs};
  return wynik
}
function lista(r,klasa) {
  const wynik = [];
  const obj = new klasy[klasa]();
  for (i of r.entry) {
    wynik.push(R.pick(Object.keys(obj), i.resource))
  }
  return wynik
}

router.get('/Patient/:id', async function(req, res, next) {
  let listaStatementow = [];
  let listaObservacji = [];
  const id = req.params.id || 1716558;
  const url = `http://hapi.fhir.org/baseDstu3/Patient/${id}?_format=json`;
  console.log(url);
  const patientJSON  = JSON.parse(await rp(url));

  try{
    const MSurl = `http://hapi.fhir.org/baseDstu3/MedicationStatement?patient=${id}&_pretty=true`;
    listaStatementow = lista(JSON.parse(await rp(MSurl)),'MedicationStatement')
  } catch (e) {}
  try {
    const Ourl = `http://hapi.fhir.org/baseDstu3/Observation?subject=${id}&_pretty=true`;
    listaObservacji = lista(JSON.parse(await rp(Ourl)),'Observation')
  } catch (e) {}
  console.log(listaStatementow);
  const patient = patientFromRespone(patientJSON,listaStatementow,listaObservacji);
  res.setHeader('Content-type','text/html');
  res.render('patient', {data: patient });
});
router.post('/:klasa', function(req, res) {
  res.send('POST route on things.')
});

module.exports = router;
