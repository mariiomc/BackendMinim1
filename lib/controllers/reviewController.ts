import { Request, Response } from 'express';
import { IReview } from '../modules/reviews/model';
import ReviewService from '../modules/reviews/service';
import UserService from '../modules/users/service';

export class ReviewController {

    private review_service: ReviewService = new ReviewService();
    private user_service: UserService = new UserService();

    public async create_review(req: Request, res: Response) {
        try{
            // this check whether all the filds were send through the request or not
            if (req.body.title && req.body.content && req.body.stars && req.body.author){
                const review_params:IReview = {
                    title: req.body.title,
                    content: req.body.content,
                    stars: req.body.stars,
                    author: req.body.author,
                    review_deactivated: false,
                    creation_date: new Date(),
                    modified_date: new Date(),
                };
                const review_data = await this.review_service.createReview(review_params);
                 //add to user
                await this.user_service.addReviewToUser(req.body.author, review_data._id); //
                return res.status(201).json(review_data);
            }else{            
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async get_review_by_id_even_deactivated(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const review_filter = { _id: req.params.id };
                // Fetch user
                const review_data = await this.review_service.filterReviewByID(review_filter);
                // Send success response
                return res.status(200).json(review_data);
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async get_review_by_id(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const review_filter = { _id: req.params.id };
                // Fetch user
                const review_data = await this.review_service.filterReviewByID(review_filter);
                if(review_data.review_deactivated===true){
                    return res.status(400).json({ error: 'Review not found' });
                }
                // Send success response
                return res.status(200).json(review_data);
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async get_reviews_by_author(req: Request, res: Response) {
        try{
            if (req.params.id) {
                const review_filter = { _id: req.params.id };
                // Fetch user
                const review_data = await this.review_service.filterReviewsByAuthor(review_filter);
                // Send success response
                return res.status(200).json(review_data);
            } else {
                return res.status(400).json({ error: 'Missing fields' });
            }
        }catch(error){
            return res.status(500).json({ error: 'Internal server error' });
        }
    }

    public async delete_review(req: Request, res: Response) {
        try {
            if (req.params.id) {
                const review_filter = { _id: req.params.id };
                // Fetch user
                const review_data = await this.review_service.filterReviewByID(review_filter);
                if(review_data.review_deactivated===true){
                    return res.status(400).json({ error: 'Review not found' });
                }
                // Create a partial user object with only the user_deactivated field updated
            const review_paramsPartial: Partial<IReview> = {
                review_deactivated: true,
                modified_date: new Date(),
            };

            // Update user
            await this.review_service.deleteReview(review_paramsPartial, review_filter);

            const new_review_data = await this.review_service.filterReviewByID(review_filter);
            // Send success response
            if (new_review_data.review_deactivated === true) {
                return res.status(200).json({ message: 'Review Deleted' });
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