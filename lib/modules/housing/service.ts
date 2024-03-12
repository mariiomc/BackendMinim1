import { ObjectId } from 'mongoose';
import { IHousing } from './model';
import housing from './schema';

export default class HousingService {
    
    public async createHouse(housing_params: IHousing): Promise<IHousing> {
        try {
            const session = new housing(housing_params);
            return await session.save();
        } catch (error) {
            throw error;
        }
    }

    public async filterHouse(query: any): Promise<IHousing | null> {
        try {
            return await housing.findOne(query);
        } catch (error) {
            throw error;
        }
    }

    public async updateSchedule(_id: ObjectId, day: string, updateSchedule: string ): Promise<void>{
        try {
            const exist = await housing.exists({_id});
            if (exist){
                const house = await housing.findById(_id);
                for (const key in house.schedule) {
                    if(Object.prototype.hasOwnProperty.call(house.schedule, key)){
                        if (key === day){
                            house.schedule[day] = updateSchedule;
                        }
                    }
                }
                await house.save();
            }
        } catch (error) {
            throw error;
        }
    }

    public async houseVerified(_id: ObjectId): Promise<void> {
        try {
            const exist = await housing.exists({_id});
            if (exist){
                const house_verified = housing.findByIdAndUpdate(_id, {verified: true});
            }
        } catch (error) {
            throw error;
        }
    }

    public async deleteHouse(_id: string): Promise<{ deletedCount: number }> {
        try {
            const query = { _id: _id };
            return await housing.deleteOne(query);
        } catch (error) {
            throw error;
        }
    }
}