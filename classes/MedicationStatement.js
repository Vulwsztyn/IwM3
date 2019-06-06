class MedicationStatement {

  constructor(id, text, subjectID, dosageText, dosage, unit, status) {
    this.id = id
    this.text = text
    this.subjectID = subjectID
    this.dosageText = dosageText
    this.dosage = dosage
    this.unit = unit
    this.status = status
  }
}
module.exports = MedicationStatement
