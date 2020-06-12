import { Request, Response } from 'express';
import knex from '../database/connections';

class ActivityController {
    async index(req: Request, res : Response) {
        const activities = await knex('activity').select('*');

        return res.json(activities);
    }
}

export default ActivityController;