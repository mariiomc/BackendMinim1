import { Application, Request, Response, NextFunction } from 'express';
import { ReviewController } from '../controllers/reviewController';
import  {authJWT}  from '../middlewares/authJWT';


export class ReviewRoutes {

    private review_controller: ReviewController = new ReviewController();
    private AuthJWT: authJWT = new authJWT();


    public route(app: Application) {
        
        app.post('/review', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.review_controller.create_review(req, res);
        });

        app.get('/review/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.review_controller.get_review_by_id(req, res);
        });

        app.get('/review/admin/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isAdmin(req, res, next);
            this.review_controller.get_review_by_id_even_deactivated(req, res);
        });

        app.get('/review/byAuthor', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.review_controller.get_reviews_by_author(req, res);
        });

        app.get('/review/byPlace', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.review_controller.get_reviews_by_place(req, res);
        });

        app.get('/review/byHousing', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.review_controller.get_reviews_by_housing(req, res);
        });

        app.put('/review/:id', (req: Request, res: Response,next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isOwner(req, res, next,'Review');
            this.review_controller.update_review(req, res);
        });

        app.delete('/review/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isOwner(req, res, next,'Review');
            this.review_controller.delete_review(req, res);
        });

    }
}