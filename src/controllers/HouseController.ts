import { Request, Response } from 'express';
import knex from '../database/connections';

class HouseController {
    async index(req: Request, res: Response) { // Será oq irá aparecer no mapa
        const { city, uf } = req.query;
        

        const houses = await knex('house').join('house_activity', 'id_house', '=', 'id_activity')
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('house.*');
        return res.json(houses);
    }

    async show(req: Request, res: Response){
        const id = req.params.id;
        const house = await knex('house').where('id', id).select('*').first();

        const activity = await knex('activity')
        .join('house_activity', 'id_house', '=', 'id_activity')
        .where('house_activity.id_house', id)
        .select('activity.name');
        
        return res.json({house, activity});
    }
}

export default HouseController;