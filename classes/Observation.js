class Observation {

  constructor(id, code, effectiveDateTime, category, status, interpretation) {
    this.id = id
    this.code = code
    this.effectiveDateTime = effectiveDateTime
    this.category = category
    this.status = status
    this.interpretation = interpretation

  }
}
module.exports = Observation