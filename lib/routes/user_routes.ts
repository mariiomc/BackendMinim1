import { Application, Request, Response } from 'express';
import { UserController } from '../controllers/userController';

export class UserRoutes {

    private user_controller: UserController = new UserController();

    public route(app: Application) {
        
        app.post('/users', (req: Request, res: Response) => {
            this.user_controller.register_user(req, res);
        });

        app.get('/users/:id', (req: Request, res: Response) => {
            this.user_controller.get_user(req, res);
        });

        //For the routes The page and pageSize parameters can be provided as query parameters:
        // e.g., /users?page=2&pageSize=10, to specify the page number and the number of users per page. 
        //If these parameters are not provided, default values will be used (page 1, pageSize 10).
        app.get('/users', (req: Request, res: Response) => {
            this.user_controller.get_users(req, res);
        });

        app.put('/users/:id', (req: Request, res: Response) => {
            this.user_controller.update_user(req, res);
        });

        app.delete('/users/:id', (req: Request, res: Response) => {
            this.user_controller.deactivate_user(req, res);
        });

    }
}
