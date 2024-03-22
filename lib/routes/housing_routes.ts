import { Application, Request, Response, NextFunction } from 'express';
import { HousingController } from '../controllers/housingController';
import  {authJWT}  from '../middlewares/authJWT';


export class HousingRoutes {

    private housing_controller: HousingController = new HousingController();
    private AuthJWT: authJWT = new authJWT();


    public route(app: Application) {
        
        
        app.post('/housing', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.housing_controller.createHouse(req, res);
        });

        app.get('/housing/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.housing_controller.getHouse(req, res);
        });
        

         app.delete('/housing/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isOwner(req, res, next,'Housing');
             this.housing_controller.deactivate_house(req, res);
         });

    }
}