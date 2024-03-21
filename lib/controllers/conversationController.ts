import { Request, Response } from 'express';
import { IConversation } from 'modules/conversations/model';
import ConversationService from 'modules/conversations/service';
import UserService from '../modules/users/service';
import e = require('express');

export class ConversationController {

    private conversation_service: ConversationService = new ConversationService();
    private user_service: UserService = new UserService();

    public async createConversation(req: Request, res: Response) {
        try {
          // this check whether all the fields were sent through the request or not
          if (
            req.body.user &&
            req.body.content
          ) {
            const conversation_params: IConversation = {
              user: req.body.user,
              content: req.body.content,
            };
            const conversation_data = await this.conversation_service.createConversation(conversation_params);
            // Now, you may want to add the created post's ID to the user's array of posts
            await this.user_service.addConversationToUser(req.body.author, conversation_data._id);
            return res.status(201).json({ message: 'Conversation created successfully', conversation: conversation_data });
          } else {
            return res.status(400).json({ error: 'Missing fields' });
          }
        } catch (error) {
          return res.status(500).json({ error: 'Internal server error' });
        }
      }

    public async getConversation(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const conversation_filter = { _id: req.params.id };
                // Fetch user
                const conversation_data = await this.conversation_service.filterConversation(conversation_filter);
                // Send success response
                return res.status(200).json({ data: conversation_data, message: 'Successful'});
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

public async deleteConversation(req: Request, res: Response) {
    try {
         if (req.params.id) {
             // Delete conversation
            const delete_details = await this.conversation_service.deleteConversation(req.params.id);
             if (delete_details.deletedCount !== 0) {
                     // Send success response if user deleted
                     return res.status(200).json({ message: 'Successful'});
                 } else {
                     // Send failure response if user not found
                     return res.status(400).json({ error: 'Conversation not found' });
                 }
             } else {
                 // Send error response if ID parameter is missing
                 return res.status(400).json({ error: 'Missing Id' });
             }
         } catch (error) {
             // Catch and handle any errors
             return res.status(500).json({ error: 'Internal server error' });
         }
     }
}