import { Application, Request, Response, NextFunction } from 'express';
import { UserController } from '../controllers/userController';
import  {authJWT}  from '../middlewares/authJWT';
import { AuthController } from '../controllers/authController';

export class UserRoutes {

    private user_controller: UserController = new UserController();
    private AuthJWT: authJWT = new authJWT();
    private auth_controller: AuthController = new AuthController();

    public route(app: Application) {
        
        app.post('/users', (req: Request, res: Response) => {
            this.user_controller.register_user(req, res);
        });

        app.get('/login', (req: Request, res: Response) => {
            this.auth_controller.signin(req, res);
        });

        app.get('/users/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.user_controller.get_user(req, res);
        });

        app.get('/users/admin/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isAdmin(req, res, next);
            this.user_controller.get_user_even_deactivated(req, res);
        });

        //For the routes The page and pageSize parameters can be provided as query parameters:
        // e.g., /users?page=2&pageSize=10, to specify the page number and the number of users per page. 
        //If these parameters are not provided, default values will be used (page 1, pageSize 10).
        app.get('/users', (req: Request, res: Response,next: NextFunction) => {
            this.AuthJWT.verifyToken(req,res,next);
            this.user_controller.get_users(req, res);
        });

        app.get('/users/admin', (req: Request, res: Response,next: NextFunction) => {
            this.AuthJWT.verifyToken(req,res,next);
            this.AuthJWT.isAdmin(req, res, next);
            this.user_controller.get_users_even_deactivated(req, res);
        });

        app.put('/users/:id', (req: Request, res: Response,next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isOwner(req, res, next,'User');
            this.user_controller.update_user(req, res);
        });

        app.delete('/users/:id', (req: Request, res: Response,next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isOwner(req, res, next,'User');            
            this.user_controller.deactivate_user(req, res);
        });

    }
}
