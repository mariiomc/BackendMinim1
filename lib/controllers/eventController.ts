import { Request, Response } from 'express';
import { IEvent } from '../modules/events/model';
import EventService from '../modules/events/service';
import UserService from '../modules/users/service';
import * as mongoose from 'mongoose';

export class EventController {

  private event_service: EventService = new EventService();
  private user_service: UserService = new UserService();

  public async create_event(req: Request, res: Response) {
      try {
        console.log("create event")
        console.log(req.body.ultimoLogin, req.body.edicionUser, req.body.User)
        // this check whether all the fields were sent through the request or not
        if (
            req.body.ultimoLogin && req.body.edicionUser && req.body.User
        ) {
        console.log("IEvent")
          const event_params: IEvent = {
            ultimoLogin: req.body.ultimoLogin,
            User: req.body.User,
            edicionUser: req.body.edicionUser,
            event_deactivated: false
          };
          console.log("Event data")
          const event_data = await this.event_service.createEvent(event_params);
          // Now, you may want to add the created post's ID to the user's array of posts
          console.log("event data realizado")
          return res.status(201).json(event_data);
        } else {
            console.log("missing fields")
          return res.status(400).json({ error: 'Missing fields' });
        }
      } catch (error) {
        console.log("Error: "+error)
        return res.status(500).json({ error: 'Internal server error' });
      }
  }

  public async get_event(req: Request, res: Response) {
      try{
          if (req.params.id) {
              const event_filter = { _id: req.params.id };
              // Fetch user
              const event_data = await this.event_service.filterOneEvent(event_filter);
              
              if(event_data.User){
                const user_data = await this.user_service.filterOneUser(event_data.User);
                return res.status(200).json(event_data && user_data);
              }
              // Send success response
              return res.status(200).json(event_data);
          } else {
              return res.status(400).json({ error: 'Missing fields' });
          }
      }catch(error){
          return res.status(500).json({ error: 'Internal server error' });
      }
  }
  
  public async get_events(req: Request, res: Response) {
    try {
        // Extract pagination parameters from query string or use default values
        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize as string) : 10;

        // Fetch users based on pagination parameters
        const event_data = await this.event_service.filterEvents({}, page, pageSize);

        // Send success response
        return res.status(200).json(event_data);
    } catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async update_event(req: Request, res: Response) {
    try {
        if (req.params.id) {
            const event_filter = { _id: req.params.id };
            // Fetch user
            const event_data = await this.event_service.filterOneEvent(event_filter);
            if(event_data.event_deactivated===true){
                return res.status(400).json({ error: 'Event not found' });
            }

            const objectid = new mongoose.Types.ObjectId(req.params.id);

            // Check if emergency_contact exists in req.body and handle accordingly
            const place_params: IEvent = {
                _id: objectid,
                ultimoLogin: event_data.ultimoLogin,
                User: event_data.User,
                edicionUser: event_data.edicionUser,
                event_deactivated: event_data.event_deactivated,
            };

            await this.event_service.updateEvent(place_params);

            const new_event_data = await this.event_service.filterOneEvent(event_filter);

            // Send success response
            return res.status(200).json(new_event_data);
        } else {
            // Send error response if ID parameter is missing
            return res.status(400).json({ error: 'Missing ID parameter' });
        }
    } catch (error) {
        // Catch and handle any errors
        console.error("Error updating:", error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

  public async deactivate_event(req: Request, res: Response) {
      try {
          if (req.params.id) {
              const event_filter = { _id: req.params.id };
              // Fetch user
              const event_data = await this.event_service.filterOneEvent(event_filter);
              if(event_data.event_deactivated===true){
                  return res.status(400).json({ error: 'Place not found' });
              }
              // Create a partial user object with only the user_deactivated field updated
          const event_paramsPartial: Partial<IEvent> = {
              event_deactivated: true,
          };

          // Update user
          await this.event_service.deactivateEvent(event_paramsPartial, event_filter);

          const new_event_data = await this.event_service.filterOneEvent(event_filter);
          // Send success response
          if (new_event_data.event_deactivated === true) {
              return res.status(200).json({ message: 'Place Deleted' });
          }
      } else {
          // Send error response if ID parameter is missing
          return res.status(400).json({ error: 'Missing ID parameter' });
      }
  } catch (error) {
      // Catch and handle any errors
      console.error("Error updating:", error);
      return res.status(500).json({ error: 'Internal server error' });
  }
}
     
}