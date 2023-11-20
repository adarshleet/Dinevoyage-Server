import bookingModel from "../database/bookingsModel";
import BookingRepository from "../../usecase/interface/bookingRepository";
import { Types } from 'mongoose';
import restaurantModel from "../database/restaurantModel";

interface TableCounts {
    [key: string]: number;
}
class bookingRepository implements BookingRepository {
    async dateSeatDetails(restaurantId: string, date: string, time: string) {
        try {
            const seatDetails = await bookingModel.findOne({ restaurantId, bookings: { $elemMatch: { date, time } } })
            return seatDetails
        } catch (error) {
            console.log(error);
        }
    }

    async confirmBooking(restaurantId: string, date: string, time: string, table: string) {
        try {
            const bookingConfirm = await bookingModel.updateOne({ restaurantId }, { $push: { bookings: { date, time, table } } }, { upsert: true })
            return bookingConfirm
        } catch (error) {
            console.log(error);
        }
    }

    async tableCounts(restaurantId: string, date: string, time: string) {
        try {
            const seatCounts = await bookingModel.aggregate([
                {
                    $match: {
                        restaurantId: new Types.ObjectId(restaurantId)
                    }
                },
                {
                    $unwind: '$bookings'
                },
                {
                    $match: {
                        'bookings.table': { $exists: true },
                        'bookings.date' : date,
                        'bookings.time' : time
                    }
                },
                {
                    $group: {
                        _id: '$bookings.table',
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0, // Exclude _id field from the result
                        table: '$_id',
                        count: 1
                    }
                }
            ])

            const restaurantDetails = await restaurantModel.findOne({ _id: restaurantId }, { tableCounts: 1 });

            console.log(restaurantDetails?.tableCounts, seatCounts)

            if (restaurantDetails) {
            
                const tableCounts = restaurantDetails.tableCounts as TableCounts | undefined;
            
                const calculateDifference = (): { [key: string]: number } => {
                    const difference: { [key: string]: number } = {};
                
                    // Initialize difference with all possible table types and their full counts
                    Object.keys(tableCounts || {}).forEach((tableType) => {
                        // Assuming tableCounts values are meant to be numbers, convert them
                        let fullCount:any = (tableCounts?.[tableType] as number) || 0;
                        fullCount = parseInt(fullCount)

                        difference[tableType] = fullCount;
                    });
                
                    seatCounts.forEach((item) => {
                        const tableType = item.table;
                        const countFromDict = tableCounts?.[tableType] || 0;
                        const countFromList = item.count;
                        // Subtract the count from seatCounts
                        difference[tableType] -= countFromList;
                    });
                
                    return difference;
                };
                // Calculate the difference
                const result = calculateDifference();
            
                // Print the difference
                console.log(result);
                return result
            } else {
                console.log('Restaurant details not found.');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default bookingRepository