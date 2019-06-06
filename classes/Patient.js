class Patient {
  constructor(id, versionId, lastUpdated, gender, birthDate, active, name, surname, address, city) {
    this.id = id
    this.versionId = versionId
    this.lastUpdated = lastUpdated
    this.gender = gender
    this.birthDate = birthDate
    this.active = active
    this.name = name
    this.surname = surname
    this.address = address
    this.city = city
  }
}
module.exports = Patient
