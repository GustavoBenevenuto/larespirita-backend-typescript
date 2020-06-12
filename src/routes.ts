import express from 'express';

import HouseController from './controllers/HouseController';
import ActivityController from './controllers/ActivityControllers';

const houseController = new HouseController();
const activityController = new ActivityController();

// Router() serve para desacoplar as rotas para outros arquivos
// ou seja, o routes vai funcionar da mesma forma q o const app
const routes = express.Router();

// Listar items
routes.get('/', (req, res) => {
    res.json({msg: "success"});
});

routes.get('/activity', activityController.index);

routes.get('/house', houseController.index);

routes.get('/house/:id', houseController.show);

routes.post('/house', houseController.create);

export default routes;