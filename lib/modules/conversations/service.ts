import { IConversation } from './model';
import conversations from './schema';

export default class ConversationService {
    
    public async createConversation(conversations_params: IConversation): Promise<IConversation> {
        try {
            const session = new conversations(conversations_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterPost(query: any): Promise<IConversation | null> {
        try {
            return await conversations.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async deletePost(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await conversations.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }
}