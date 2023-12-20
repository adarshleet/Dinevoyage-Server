"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const restaurantSchema = new mongoose_1.Schema({
    vendorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Vendor'
    },
    restaurantName: {
        type: String
    },
    landmark: {
        type: String
    },
    locality: {
        type: String
    },
    district: {
        type: String
    },
    location: {
        longitude: {
            type: Number
        },
        latitude: {
            type: Number
        }
    },
    openingTime: {
        type: String
    },
    closingTime: {
        type: String
    },
    minCost: {
        type: Number
    },
    contactNumber: {
        type: String
    },
    status: {
        type: Number,
        default: 1
    },
    tableCounts: {
        type: Object
    },
    banners: {
        type: Array
    },
    cuisines: {
        type: Array
    },
    facilities: {
        type: Array
    },
    googlemapLocation: {
        type: String
    }
}, {
    timestamps: true
});
const restaurantModel = mongoose_1.default.model('Restaurant', restaurantSchema);
exports.default = restaurantModel;
