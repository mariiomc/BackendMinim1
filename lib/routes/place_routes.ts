import { Application, Request, Response, NextFunction } from 'express';
import { PlaceController } from '../controllers/placeController';
import  {authJWT}  from '../middlewares/authJWT';


export class PlaceRoutes {

    private place_controller: PlaceController = new PlaceController();
    private AuthJWT: authJWT = new authJWT();


    public route(app: Application) {
        
        app.post('/place', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.place_controller.create_place(req, res);
        });

        app.get('/place/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.place_controller.get_place(req, res);
        });

        app.get('/place', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.place_controller.get_places(req, res);
        });

        app.get('/place/admin', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isAdmin(req, res, next);
            this.place_controller.get_places_even_deactivated(req, res);
        });

        app.put('/place/:id', (req: Request, res: Response,next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isOwner(req, res, next,'Place');
            this.place_controller.update_place(req, res);
        });

        app.delete('/place/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isOwner(req, res, next,'Place');
             this.place_controller.deactivate_place(req, res);
         });

    }
}