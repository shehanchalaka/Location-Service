import Joi from "joi";

const DEFAULT_LOCATION_SERVICE = process.env.DEFAULT_LOCATION_SERVICE;

export const geocodeSchema = Joi.object({
  latitude: Joi.number().required(),
  longitude: Joi.number().required(),
  service: Joi.string()
    .valid("google", "here", "openStreetMaps")
    .default(DEFAULT_LOCATION_SERVICE),
});

export const autocompleteSchema = Joi.object({
  query: Joi.string().required(),
  latitude: Joi.number().default(1.340881),
  longitude: Joi.number().default(103.958046),
  service: Joi.string()
    .valid("google", "here", "openStreetMaps")
    .default(DEFAULT_LOCATION_SERVICE),
});
