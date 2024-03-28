import { Request, Response } from 'express';
import { IHousing } from '../modules/housing/model';
import UserService from '../modules/users/service';
import e = require('express');
import HousingService from 'modules/housing/service';

export class HousingController {

    private housing_service: HousingService = new HousingService();
    private user_service: UserService = new UserService();

    public async createHouse(req: Request, res: Response) {
        try {
          // this check whether all the fields were sent through the request or not
          if (
            req.body.title &&
            req.body.description &&
            req.body.owner &&
            req.body.rating &&
            req.body.coords && // corrected here
            req.body.photo &&
            req.body.location &&
            req.body.availability &&
            req.body.coffe &&
            req.body.schedule &&
            req.body.verified &&
            req.body.date &&
            req.body.deactivated
          ) {
            const house_params: IHousing = {
              title: req.body.title,
              description: req.body.description,
              owner: req.body.owner,
              rating: req.body.rating,
              reviews: req.body.reviews,
              coords:{
                latitude: req.body.coords.latitude,
                longitude: req.body.coords.longitude,
              },
              photo: req.body.photo,
              location: req.body.location,
              availability: req.body.availability,
              coffee: req.body.coffee,
              schedule: {
                monday: req.body.schedule.monday,
                tuesday: req.body.schedule.tuesday,
                wednesday: req.body.schedule.wednesday,
                thursday: req.body.schedule.thursday,
                friday: req.body.schedule.friday,
                saturday: req.body.schedule.saturday,
                sunday: req.body.schedule.sunday,
              },
              verified: req.body.verified,
              date: req.body.date,
              deactivated: req.body.deactivated,
            };
            const house_data = await this.housing_service.createHouse(house_params);
            // Now, you may want to add the created post's ID to the user's array of posts
            await this.user_service.addHousingOfferedToUser(req.body.author, house_data._id);
            return res.status(201).json(house_data);
          } else {
            return res.status(400).json({ error: 'Missing fields' });
          }
        } catch (error) {
          return res.status(500).json({ error: 'Internal server error' });
        }
      }

    public async getHouse(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const house_filter = { _id: req.params.id };
                // Fetch user
                const house_data = await this.housing_service.filterHouse(house_filter);
                // Send success response
                return res.status(200).json(house_data);
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async deactivate_house(req: Request, res: Response) {
      try {
        if (req.params.id) {
            const house_filter = { _id: req.params.id };
            // Fetch user
            const house_data = await this.housing_service.filterHouse(house_filter);
            if(house_data.house_deactivated===true){
                return res.status(400).json({ error: 'House not found' });
            }
            // Create a partial user object with only the user_deactivated field updated
        const house_paramsPartial: Partial<IHousing> = {
            house_deactivated: true,
            modified_date: new Date(),
        };

        // Update user
        await this.housing_service.deactivatehouse(house_data);

        const new_house_data = await this.housing_service.filterHouse(house_filter);
        // Send success response
        if (new_house_data.house_deactivated === true) {
            return res.status(200).json({ message: 'Successful' });
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