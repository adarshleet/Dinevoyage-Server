import bookingModel from "../database/bookingsModel";
import UserModel from "../database/userModel";
import BookingRepository from "../../usecase/interface/bookingRepository";
import { Types } from 'mongoose';
import restaurantModel from "../database/restaurantModel";
import Booking from "../../domain/booking";
import vendorModel from "../database/vendorModel";
import couponModel from "../database/couponModal";

interface TableCounts {
    [key: string]: number;
}
class bookingRepository implements BookingRepository {
    async dateSeatDetails(restaurantId: string, date: string, time: string):Promise<Booking | null> {
        try {
            const seatDetails = await bookingModel.findOne({ restaurantId, bookings: { $elemMatch: { date, time } } }) as Booking
            return seatDetails
        } catch (error) {
            console.log(error);
            return null
        }
    }

    async confirmBooking(bookingDetails: Booking):Promise<any> {
        try {
            const restaurantId = bookingDetails.restaurantId
            if(bookingDetails?.appliedCoupon?.couponName){
                const addUserToCoupon = await couponModel.updateOne({couponName:bookingDetails?.appliedCoupon.couponName},{$push:{usedUsers:bookingDetails.user}})
            }

            if(bookingDetails?.walletAmountUsed ?? 0 > 0){
                const walletUpdate = await UserModel.updateOne({_id:bookingDetails.user},{$inc:{wallet:-(bookingDetails.walletAmountUsed ?? 0)},$push:{walletHistory:{
                    transactionType: 'Table Booking',
                    method:'Debit',
                    amount: bookingDetails.walletAmountUsed,
                    date: Date.now()
                }}})
            }


            const bookingConfirm = await bookingModel.updateOne({ restaurantId }, { $push: { bookings: bookingDetails } },{upsert:true})

            return bookingConfirm
        } catch (error) {
            console.log(error);
        }
    }

    async tableCounts(restaurantId: string, date: string, time: string):Promise<any> {
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
                        'bookings.date': date,
                        'bookings.time': time
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
                        let fullCount: any = (tableCounts?.[tableType] as number) || 0;
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

                return result
            } else {
                console.log('Restaurant details not found.');
            }
        } catch (error) {
            console.log(error);
        }
    }


    //user bookings
    async userBookings(userId: string):Promise<Array<Booking> | null> {
        try {
            const bookings = await bookingModel.find({ 'bookings.user': userId, 'restaurantId': { $ne: null } }).populate('restaurantId') as Array<Booking> | null
            return bookings
        } catch (error) {
            console.log(error)
            return null
        }
    }


    //user booking cancellation
    async userBookingCancellation(bookingId: string, reason: string) {
        try {

            const bookingStatus = await bookingModel.findOneAndUpdate(
                {
                    'bookings._id': bookingId
                },
                {
                    $set: { 'bookings.$.orderStatus': 3, 'bookings.$.cancelReason': reason }
                },
                { new: true }
            );
            const bookingDetails = await bookingModel.findOne({'bookings._id':bookingId},{ 'bookings.$': 1 })

            const booking = bookingDetails?.bookings[0] as any
            const walletUpdate = await UserModel.updateOne({_id:booking?.user},{$inc:{wallet:booking?.totalAmount-100},$push:{walletHistory:{
                transactionType: 'Booking Cancellation',
                method:'Credit',
                amount: booking?.totalAmount-100,
                date: Date.now()
            }}})

            return bookingStatus
        } catch (error) {
            console.log(error)
        }
    }







    //vendor
    //all booking lists
    async allBookings(restaurantId: string, page: number) {
        try {
            const limit = 2
            const skip = (page - 1) * limit;


            const result = await bookingModel.findOne({ restaurantId })

            const totalCount = result?.bookings.length || 0;
            const totalPages = Math.ceil(totalCount / limit);
            const allBookingDetails = result?.bookings.slice(skip, skip + limit) || [];

            return {
                allBookingDetails,
                totalPages,
                currentPage: page
            }
        } catch (error) {
            console.log(error)
        }
    }

    //change booking status
    async changeBookingStatus(bookingId: string, reason: string) {
        try {
            const bookingStatus = await bookingModel.findOneAndUpdate(
                {
                    'bookings._id': bookingId
                },
                {
                    $set: { 'bookings.$.orderStatus': 2, 'bookings.$.cancelReason': reason }
                },
                { new: true }
            );

            const booking = bookingStatus?.bookings[0] as any
            console.log(booking)
            const walletUpdate = await UserModel.updateOne({_id:booking?.user},{$inc:{wallet:booking?.totalAmount},$push:{walletHistory:{
                transactionType: 'Booking Cancellation By Admin',
                method:'Credit',
                amount: booking.totalAmount,
                date: Date.now()
            }}})
            
            return bookingStatus
        } catch (error) {
            console.log(error)
        }
    }


    async salesChart(restaurantId: string) {
        try {
            const sales = await bookingModel.aggregate([
                {
                    $match: {
                        'restaurantId': new Types.ObjectId(restaurantId)
                    }
                },
                {
                    $unwind: "$bookings",
                },
                {
                    $match: {
                        "bookings.orderStatus": 4,
                    },
                },
                {
                    $addFields: {
                        bookingDate: {
                            $toDate: "$bookings.date",
                        },
                    },
                },
                {
                    $group: {
                        _id: {
                            month: { $month: "$bookingDate" },
                            year: { $year: "$bookingDate" },
                        },
                        totalAmount: {
                            $sum: {
                                $add: [
                                    "$bookings.totalAmount",
                                    { $ifNull: ["$bookings.walletAmountUsed", 0] } // Use $ifNull to handle potential null values
                                ]
                            }
                        },
                    },
                },
                {
                    $set: {
                        month: '$_id.month',
                        totalAmount: "$totalAmount",
                    },
                },
                {
                    $unset: "_id",
                },
            ]);

            console.log(sales)
            const totalBookings = await bookingModel.aggregate([
                {
                    $match: {
                        'restaurantId': new Types.ObjectId(restaurantId)
                    }
                },
                {
                    $unwind: '$bookings',
                },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 }
                    }
                }
            ]);

            const bookingCount = totalBookings[0]?.count || 0

            const result = await bookingModel.aggregate([
                {
                    $match: {
                        'restaurantId': new Types.ObjectId(restaurantId),
                        'bookings.orderStatus': { $gt: 1, $lt: 4 }
                    }
                },
                {
                    $unwind: '$bookings',
                },
                {
                    $match: {
                        'bookings.orderStatus': { $gt: 1, $lt: 4 }
                    }
                },
                {
                    $group: {
                        _id: null,
                        count: { $sum: 1 },
                        totalAmount: { $sum: '$bookings.totalAmount' }
                    }
                }
            ]);

            // console.log(result)
            const cancelledBookingAmount = result[0]?.totalAmount || 0
            const cancelledBookingCount = result[0]?.count || 0

            return {
                sales,
                bookingCount,
                cancelledBookingCount,
                cancelledBookingAmount
            }

        } catch (error) {
            console.log(error)
        }
    }



    //admin
    async salesDetails() {
        try {
            // const revenueDetails = await bookingModel.aggregate([
            //     {
            //       $lookup: {
            //         from: "restaurants", // Replace with the actual name of your restaurant collection
            //         localField: "restaurantId",
            //         foreignField: "_id",
            //         as: "restaurant"
            //       }
            //     },
            //     {
            //       $unwind: "$restaurant"
            //     },

            //     {
            //       $match: {
            //         "restaurant.status": { $lt: 5, $gt: 1 }
            //       }
            //     },
            //     {
            //       $addFields: {
            //         "createdAt": {
            //           $toDate: "$restaurant.createdAt"
            //         }
            //       }
            //     },
            //     {
            //         $unwind:'$bookings'
            //     },
            //     {
            //       $group: {
            //         _id: {
            //           restaurantId: "$restaurantId",
            //           year: { $year: "$createdAt" },
            //           month: { $month: "$createdAt" },
            //           day: { $dayOfMonth: "$createdAt" }
            //         },
            //         totalBookings: { $sum: 1 },
            //         completedBookings: {
            //           $sum: {
            //             $cond: {
            //               if: { $eq: ["$bookings.orderStatus", 4] },
            //               then: 1,
            //               else: 0
            //             }
            //           }
            //         }
            //       }
            //     },
            //     {
            //       $group: {
            //         _id: {
            //           year: "$_id.year",
            //           month: "$_id.month"
            //         },
            //         counts: {
            //           $push: {
            //             restaurantId: "$_id.restaurantId",
            //             day: "$_id.day",
            //             totalBookings: "$totalBookings",
            //             completedBookings: "$completedBookings"
            //           }
            //         },
            //         restaurantCount: { $sum: "$totalBookings" },
            //         totalCompletedBookings: { $sum: "$completedBookings" }
            //       }
            //     },
            //     {
            //       $project: {
            //         _id: 0,
            //         year: "$_id.year",
            //         month: "$_id.month",
            //         // counts: 1,
            //         restaurantCount: 1,
            //         totalCompletedBookings: 1
            //       }
            //     }
            //   ]);
            const desiredYear = '2023'

            const revenueDetails = await bookingModel.aggregate([
                {
                    $lookup: {
                        from: "restaurants",
                        localField: "restaurantId",
                        foreignField: "_id",
                        as: "restaurant"
                    }
                },
                {
                    $unwind: "$restaurant"
                },
                {
                    $match: {
                        "restaurant.status": { $lt: 5, $gt: 1 },
                        "restaurant.createdAt": {
                            $gte: new Date(desiredYear),
                            $lt: new Date(`${parseInt(desiredYear) + 1}`)
                        }
                    }
                },
                {
                    $addFields: {
                        "createdAt": {
                            $toDate: "$restaurant.createdAt"
                        }
                    }
                },
                {
                    $unwind: "$bookings"
                },
                {
                    $group: {
                        _id: {
                            restaurantId: "$restaurantId",
                            year: { $year: "$createdAt" },
                            month: { $month: "$createdAt" },
                            day: { $dayOfMonth: "$createdAt" }
                        },
                        totalBookings: { $sum: 1 },
                        completedBookings: {
                            $sum: {
                                $cond: {
                                    if: { $eq: ["$bookings.orderStatus", 4] },
                                    then: 1,
                                    else: 0
                                }
                            }
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            year: "$_id.year",
                            month: "$_id.month"
                        },
                        counts: {
                            $push: {
                                restaurantId: "$_id.restaurantId",
                                day: "$_id.day",
                                totalBookings: "$totalBookings",
                                completedBookings: "$completedBookings"
                            }
                        },
                        restaurantCount: { $sum: "$totalBookings" },
                        totalCompletedBookings: { $sum: "$completedBookings" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        year: "$_id.year",
                        month: "$_id.month",
                        restaurantCount: 1,
                        totalCompletedBookings: 1
                    }
                }
            ]);

            const totalUsers = await UserModel.find({}).countDocuments()

            const totalVendors = await vendorModel.find({}).countDocuments()

            const totalRestaurants = await restaurantModel.find({}).countDocuments()

            console.log(revenueDetails, totalUsers, totalVendors, totalRestaurants)

            return {
                revenueDetails,
                totalUsers,
                totalVendors,
                totalRestaurants
            }

        } catch (error) {
            console.log(error)
        }
    }


}

export default bookingRepository