import { Application, Request, Response, NextFunction } from 'express';
import { ReviewController } from '../controllers/reviewController';
import  {authJWT}  from '../middlewares/authJWT';


export class ReviewRoutes {

    private review_controller: ReviewController = new ReviewController();
    private AuthJWT: authJWT = new authJWT();


    public route(app: Application) {
        
        app.post('/review', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.review_controller.createReview(req, res);
        });

        app.get('/review/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.review_controller.getReview(req, res);
        });

        app.delete('/review/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isOwner(req, res, next,'Review');
            this.review_controller.deleteReview(req, res);
        });

    }
}