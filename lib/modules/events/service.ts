import { IEvent } from './model';
import events from './schema';
import { FilterQuery } from 'mongoose';

export default class EventService {
    
    public async createEvent(event_params: IEvent): Promise<IEvent> {
        try {
            const session = new events(event_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterOneEvent(query: any): Promise<IEvent | null> {
        try {
            return await events.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async filterEvents(query: any, page: number, pageSize: number): Promise<IEvent[] | null> {
        try {
            const skipCount = (page - 1) * pageSize;
            const updatedQuery = { ...query, event_deactivated: { $ne: true } };
            return await events.find(updatedQuery).skip(skipCount).limit(pageSize);
        } catch (error) {
            throw error;
        }
    }

    public async updateEvent(event_params: IEvent): Promise<void> {
        try {
            const query = { _id: event_params._id };
            await events.findOneAndUpdate(query, event_params);
        } catch (error) {
            throw error;
        }
    }

    public async deactivateEvent(event_paramsPartial: Partial<IEvent>, event_filter: FilterQuery<IEvent>): Promise<void> {
        try {
            await events.findOneAndUpdate(event_filter, event_paramsPartial);
        } catch (error) {
            throw error;
        }
    }

}