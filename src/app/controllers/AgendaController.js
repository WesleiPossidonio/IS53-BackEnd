import { v4 } from 'uuid'
import * as Yup from 'yup'

import Agenda from '../models/Agenda'
class AgendaController {
  async store(request, response) {
    const schema = Yup.object().shape({
      church_name: Yup.string().required(),
      agenda_date: Yup.string().required(),
      address: Yup.string().required(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }

    const { church_name, agenda_date, address } = request.body

    const listAgenda = await Agenda.create({
      id: v4(),
      church_name,
      agenda_date,
      address,
    })
    
    return response.status(201).json({ id: listAgenda.id, church_name, agenda_date, address })
  }

  async update(request, response) { 
    const schema = Yup.object.shape({
        church_name: Yup.string(),
        agenda_date: Yup.string(),
        address: Yup.string(),
    })

    try {
      await schema.validateSync(request.body, { abortEarly: false })
    } catch (err) {
      return response.status(400).json({ error: err.errors })
    }
    
    const { id } = request.params
    
    const userExists = await CreatedFormTest.findOne({
      where: { id },
    })

    if (!userExists) {
        return response.status(400).json({ error: 'User not found' })
    }

    const {
        church_name,
        agenda_date,
        address
    } = request.body

    await CreatedFormTest.update(
        {
            church_name,
            agenda_date,
            address
        },
        { where: { id } }
    )

    return response.json({ message: 'status was update sucessfully' })
  }

  async index(request, response) {
    try {
      const agendaList = await Agenda.findAll()
      response.status(200).json(agendaList)
    } catch (error) {
      console.log(error)
      response.status(500).send('Internal server error')
    }
  }


  async delete(request, response) {
    const { id } = request.params;

    try {
      const agenda = await Agenda.findByPk(id);

      if (!agenda) {
        return response.status(404).json({ error: 'Agenda not found' });
      }

      // Delete the agenda
      await agenda.destroy();

      return response.json({ message: 'Agenda deleted successfully' });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Internal server error' });
    }
  }

}

export default new AgendaController()