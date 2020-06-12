import { Request, Response } from 'express';
import knex from '../database/connections';

interface House_Activity{
    id_activity : number,
    weekday: string
    hours: string
}

class HouseController {

    async create(req: Request, res: Response) {

        const {
            name, latitude, longitude,
            uf, city, neighborhood,
            street, number, telephone, email,
            activities
        } = req.body;

        const houseData = {
            name, latitude, longitude,
            uf, city, neighborhood,
            street, number, telephone, email
        }


        // Garante q se alguma inserção falhar, a outra n irá executar
        const trx = await knex.transaction();
        
        const id_house = await trx('house').insert(houseData, 'id');

        

        const house_activity = activities.map((item : House_Activity) => {
            return {
                weekday: item.weekday,
                hours: item.hours,
                id_house: id_house[0],
                id_activity: item.id_activity
            }
        });

        console.log(house_activity);

        await trx('house_activity').insert(house_activity);

        await trx.commit();

        return res.json({menssage : "success"});
    }

    async index(req: Request, res: Response) { // Será oq irá aparecer no mapa
        const { city, uf } = req.query;

        const houses = await knex('house').join('house_activity', 'id_house', '=', 'id_activity')
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('house.*');

        return res.json(houses);
    }

    async show(req: Request, res: Response) { // Será oq vai aparecer nos detalhes
        const id = req.params.id;
        const house = await knex('house').where('id', id).select('*').first();

        const activity = await knex('activity')
            .join('house_activity', 'id_house', '=', 'id_activity')
            .where('house_activity.id_house', id)
            .select('activity.name');

        return res.json({ house, activity });
    }
}

export default HouseController;