class MedicationStatement {

  constructor(id, medicationCodeableConcept, dosage) {
    this.id = id
    this.medicationCodeableConcept = medicationCodeableConcept
    this.dosage = dosage
  }
}
module.exports = MedicationStatement
