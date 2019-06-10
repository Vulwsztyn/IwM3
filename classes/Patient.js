class Patient {
  constructor(id, versionId, lastUpdated, gender, birthDate, active, name, surname, address, city, extension) {
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
    this.extension = extension
  }
}
module.exports = Patient
