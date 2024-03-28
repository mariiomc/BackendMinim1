import { Application, Request, Response, NextFunction } from 'express';
import { ConversationController } from '../controllers/conversationController';
import {authJWT} from '../middlewares/authJWT';

export class ConversationRoutes {

    private conversation_controller: ConversationController = new ConversationController();
    private AuthJWT: authJWT = new authJWT();

    public route(app: Application) {

        app.post('/conversation', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.conversation_controller.create_conversation(req, res);
        });

        app.get('/conversation', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.conversation_controller.get_conversations(req, res);
        });

         app.delete('/conversation/:id', (req: Request, res: Response, next: NextFunction) => {
            this.AuthJWT.verifyToken(req, res, next);
            this.AuthJWT.isOwner(req, res, next,'Conversation');
             this.conversation_controller.deactivate_conversation(req, res);
         });

    }
}