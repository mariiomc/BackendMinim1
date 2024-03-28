import { Request, Response } from 'express';
import { IPlace } from '../modules/places/model';
import PlaceService from '../modules/places/service';
import UserService from '../modules/users/service';
import e = require('express');

export class PlaceController {

    private place_service: PlaceService = new PlaceService();
    private user_service: UserService = new UserService();

    public async createPlace(req: Request, res: Response) {
        try {
          // this check whether all the fields were sent through the request or not
          if (
            req.body.title &&
            req.body.content &&
            req.body.author &&
            req.body.rating &&
            req.body.coords && // corrected here
            req.body.photo &&
            req.body.location &&
            req.body.type &&
            req.body.schedule &&
            req.body.modified_date &&
            req.body.place_deactivated &&
            req.body.modified_date
          ) {
            const place_params: IPlace = {
              title: req.body.title,
              content: req.body.content,
              author: req.body.author,
              rating: req.body.rating,
              coords:{
                latitude: req.body.coords.latitude,
                longitude: req.body.coords.longitude,
              },
              photo: req.body.photo,
              location: req.body.location,
              typeOfPlace: {
                bankito: req.body.type.bankito,
                public: req.body.type.public,
                covered: req.body.type.covered,
              },
              schedule: {
                monday: req.body.schedule.monday,
                tuesday: req.body.schedule.tuesday,
                wednesday: req.body.schedule.wednesday,
                thursday: req.body.schedule.thursday,
                friday: req.body.schedule.friday,
                saturday: req.body.schedule.saturday,
                sunday: req.body.schedule.sunday,
              },
              modified_date: req.body.modified_date,
              place_deactivated: req.body.place_deactivated,
            };
            const place_data = await this.place_service.createPlace(place_params);
            // Now, you may want to add the created post's ID to the user's array of posts
            await this.user_service.addPlaceToUser(req.body.author, place_data._id);
            return res.status(201).json(place_data);
          } else {
            return res.status(400).json({ error: 'Missing fields' });
          }
        } catch (error) {
          return res.status(500).json({ error: 'Internal server error' });
        }
      }

    public async getPlace(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const place_filter = { _id: req.params.id };
                // Fetch user
                const place_data = await this.place_service.filterPlace(place_filter);
                // Send success response
                return res.status(200).json(place_data);
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

     public async deactivate_place(req: Request, res: Response) {
      try {
        if (req.params.id) {
            const place_filter = { _id: req.params.id };
            // Fetch user
            const place_data = await this.place_service.filterPlace(place_filter);
            if(place_data.place_deactivated===true){
                return res.status(400).json({ error: 'Place not found' });
            }
            // Create a partial user object with only the user_deactivated field updated
        const place_paramsPartial: Partial<IPlace> = {
            place_deactivated: true,
            modified_date: new Date(),
        };

        // Update user
        await this.place_service.deactivatePlace(place_data);

        const new_place_data = await this.place_service.filterPlace(place_filter);
        // Send success response
        if (new_place_data.place_deactivated === true) {
            return res.status(200).json({ message: 'Place deactivated' });
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