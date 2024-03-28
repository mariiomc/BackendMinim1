import { Request, Response } from 'express';
import { IConversation } from '../modules/conversations/model';
import ConversationService from '../modules/conversations/service';
import UserService from '../modules/users/service';
import e = require('express');

export class ConversationController {

    private conversation_service: ConversationService = new ConversationService();
    private user_service: UserService = new UserService();

    public async createConversation(req: Request, res: Response) {
      try{
          // this check whether all the filds were send through the request or not
          if (req.body.user
              && req.body.content
              ) {
              const conversation_params: IConversation = {
                  user: req.body.user,
                  content: req.body.content,
              };
              const conversation_data = await this.conversation_service.createConversation(conversation_params);
              return res.status(201).json(conversation_data);
          }else{            
              return res.status(400).json({ error: 'Missing fields' });
          }
      }catch(error){
          return res.status(500).json({ error: 'Internal server error' });
      }
  }

  public async getConversations(req: Request, res: Response) {
    try{
        if (req.params.id) {
            const user_filter = { _id: req.params.id };
            // Fetch user
            const user_data = await this.user_service.filterOneUser(user_filter);
            if(user_data.user_deactivated===true){
                return res.status(400).json({ error: 'User not found' });
            }
            // Send success response
            return res.status(200).json(user_data);
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
                     return res.status(200).json({ message: 'Conversation Deleted'});
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