import { Application, Request, Response } from 'express';
import { PlaceController } from '../controllers/placeController';

export class PlaceRoutes {

    private place_controller: PlaceController = new PlaceController();

    public route(app: Application) {
        
        app.post('/place', (req: Request, res: Response) => {
            this.place_controller.createPlace(req, res);
        });

        app.get('/place/:id', (req: Request, res: Response) => {
            this.place_controller.getPlace(req, res);
        });

        // app.delete('/place/:id', (req: Request, res: Response) => {
        //     this.place_controller.deletePlace(req, res);
        // });

    }
}