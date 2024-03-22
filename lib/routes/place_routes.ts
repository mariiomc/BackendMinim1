import { Application, Request, Response, NextFunction } from 'express';
import { PlaceController } from '../controllers/placeController';
import  {authJWT}  from '../middlewares/authJWT';


export class PlaceRoutes {

    private place_controller: PlaceController = new PlaceController();
    private AuthJWT: authJWT = new authJWT();


    public route(app: Application) {
        
        app.post('/place', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.place_controller.createPlace(req, res);
        });

        app.get('/place/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.place_controller.getPlace(req, res);
        });

        app.delete('/place/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isOwner(req, res, next,'Place');
             this.place_controller.deactivate_place(req, res);
         });

    }
}