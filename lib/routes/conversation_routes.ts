import { Application, Request, Response } from 'express';
import { ConversationController } from '../controllers/conversationController';

export class ConversationRoutes {

    private conversation_controller: ConversationController = new ConversationController();

    public route(app: Application) {
        
        app.post('/conversation', (req: Request, res: Response) => {
            this.conversation_controller.createConversation(req, res);
        });

        app.get('/conversation/:id', (req: Request, res: Response) => {
            this.conversation_controller.getConversations(req, res);
        });

        app.delete('/conversation/:id', (req: Request, res: Response) => {
            this.conversation_controller.deleteConversation(req, res);
        });

    }
}