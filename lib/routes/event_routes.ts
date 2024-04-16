import { Application, Request, Response, NextFunction } from 'express';
import { EventController } from '../controllers/eventController';
import  {authJWT}  from '../middlewares/authJWT';


export class EventRoutes {

    private event_controller: EventController = new EventController();
    private AuthJWT: authJWT = new authJWT();


    public route(app: Application) {
        
        app.post('/event', (req: Request, res: Response, next: NextFunction) => {
            console.log("Entramos en verifyToken")
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    console.log("Error: " + err)
                    return next(err); // Short-circuit if token verification fails
                }
                console.log("Entramos en crear evento")
                this.event_controller.create_event(req, res);
                
            });
        });

        app.get('/event/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.event_controller.get_event(req, res);
            });
        });
        app.get('/event', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.event_controller.get_events(req, res);
            });
        });

        app.put('/event/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.AuthJWT.isOwner(req, res, (err?: any) => {
                    if (err) {
                        return next(err); // Short-circuit if isOwner check fails
                    }
                    this.event_controller.update_event(req, res);
                }, 'Event');
            });
        });

        app.delete('/event/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, (err?: any) => {
                if (err) {
                    return next(err); // Short-circuit if token verification fails
                }
                this.AuthJWT.isOwner(req, res, (err?: any) => {
                    if (err) {
                        return next(err); // Short-circuit if isOwner check fails
                    }
                    this.event_controller.deactivate_event(req, res);
                }, 'Event');
            });
        });

    }
}