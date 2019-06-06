class Observation {

  constructor(id, text, subjectID, issuedDate, value, unit) {
    this.id = id
    this.text = text
    this.subjectID = subjectID
    this.issuedDate = issuedDate
    this.value = value
    this.unit = unit
  }
}
module.exports = Observation