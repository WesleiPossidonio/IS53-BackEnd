import Sequelize, { Model } from 'sequelize'

class Agenda extends Model {
  static init(sequelize) {
    super.init(
      {
        church_name: Sequelize.STRING,
        agenda_date: Sequelize.STRING,
        address: Sequelize.STRING,
      },
      {
        sequelize,
      }
    )
  }
}

export default Agenda