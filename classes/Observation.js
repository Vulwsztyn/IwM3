class Observation {
  constructor(id, code, effectiveDateTime, category, status, interpretation, valueQuantity) {
    this.id = id
    this.code = code
    this.effectiveDateTime = effectiveDateTime
    this.category = category
    this.status = status
    this.interpretation = interpretation
    this.valueQuantity = valueQuantity
  }
}
module.exports = Observation
