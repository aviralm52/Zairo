import { timeStamp } from "console";
import mongoose from "mongoose";
import { type } from "os";
const PropertySchema = new mongoose.Schema(
  {
    propertyType: {
      type: String,
      // required: true,
    },
    placeName: {
      type: String,
      // required: true,
    },
    rentalForm: {
      type: String,
      // required: true,
    },
    numberOfPortions: {
      type: Number,
      default: 1,
    },
    city: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    postalCode: {
      type: String,
			// required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    street: {
      type: String,
			// required: true,
    },
    center: {
      type: Object,
    },
    roomNumber: {
      type: Number,
    },
    portionName: {
      type: [String],
      // default: [],
    },
    portionSize: {
      type: [Number],
      // default: [],
    },
    guests: {
      type: [Number],
      // default: [],
    },
    bedrooms: {
      type: [Number],
      // default: [],
    },
    beds: {
      type: [Number],
      // default: [],
    },
    bathroom: {
      type: [Number],
      // default: [],
    },
    kitchen: {
      type: [Number],
      // default: [],
    },
    childrenAge: {
      type: [Number],
      // default: [],
    },
    basePrice: {
      type: [Number],
      // default: [],
    },
    weekendPrice: {
      type: [Number],
      // default: [],
    },
    monthlyDiscount: {
      type: [Number],
      // default: [],
    },
    currency: String,
    generalAmenities: {
      type: {
        tv: Boolean,
        wifi: Boolean,
        internet: Boolean,
        airConditioning: Boolean,
        fan: Boolean,
        private_entrance: Boolean,
        dryer: Boolean,
        heater: Boolean,
        washing_machine: Boolean,
        detergent: Boolean,
        cloth_dryer: Boolean,
        baby_cots: Boolean,
        desk: Boolean,
        fridge: Boolean,
      },
    },
    otherAmenities: {
      type: {
        wardrobe: Boolean,
        cloth_hook: Boolean,
        extra_sofa: Boolean,
        gas_stove: Boolean,
        toilet_paper: Boolean,
        free_toiletries: Boolean,
        makeup_table: Boolean,
        hot_pot: Boolean,
        bathroom_heaters: Boolean,
        kettle: Boolean,
        dishwasher: Boolean,
        bbq_grill: Boolean,
        toaster: Boolean,
        towel: Boolean,
        dining_table: Boolean,
      },
    },
    safeAmenities: {
      type: {
        fire_siren: Boolean,
        fire_extinguisher: Boolean,
        antitheft_key: Boolean,
        safe_vault: Boolean,
      },
    },
    smoking: String,
    pet: String,
    party: String,
    cooking: String,
    additionalRules: {
      type: [String],
      default: [],
    },
    reviews: {
      type: [String],
      default: [],
    },
    propertyCoverFileUrl: String,
    propertyPictureUrls: [String],
    portionCoverFileUrls: [String],
    portionPictureUrls: [[String]],
    isLive: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const User =
  mongoose.models.users || mongoose.model("users", PropertySchema);
