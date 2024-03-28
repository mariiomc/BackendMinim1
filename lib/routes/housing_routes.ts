import { Application, Request, Response, NextFunction } from 'express';
import { HousingController } from '../controllers/housingController';
import  {authJWT}  from '../middlewares/authJWT';


export class HousingRoutes {

    private housing_controller: HousingController = new HousingController();
    private AuthJWT: authJWT = new authJWT();


    public route(app: Application) {
        
        
        app.post('/housing', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.housing_controller.create_house(req, res);
        });

        app.get('/housing/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.housing_controller.get_house(req, res);
        });

        app.get('/housing', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.housing_controller.get_housing(req, res);
        });

        app.get('/housing/admin', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isAdmin(req, res, next);
            this.housing_controller.get_housing_even_deactivated(req, res);
        });

        app.put('/housing/:id', (req: Request, res: Response,next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isOwner(req, res, next,'Housing');
            this.housing_controller.update_house(req, res);
        });

         app.delete('/housing/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isOwner(req, res, next,'Housing');
             this.housing_controller.deactivate_house(req, res);
         });
    }
}