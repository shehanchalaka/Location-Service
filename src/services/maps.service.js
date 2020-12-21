import * as GoogleAPI from "../api/Google";
import * as HereAPI from "../api/Here";
import * as OpenStreetMapsAPI from "../api/OpenStreetMaps";
import { geocodeSchema, autocompleteSchema } from "../validators";
import { useCache } from "./cache.service";

const API = {
  google: GoogleAPI,
  here: HereAPI,
  openStreetMaps: OpenStreetMapsAPI,
};

export default {
  async geocode(args) {
    const input = await geocodeSchema.validateAsync(args);
    const service = input?.service;

    const result = await useCache(
      "geocode",
      API[service].reverseGeocode,
      input
    );

    return { ...result, meta: { ...result.meta, service } };
  },

  async autocomplete(args) {
    const input = await autocompleteSchema.validateAsync(args);
    const service = input?.service;

    const result = await useCache(
      "autocomplete",
      API[service].autocomplete,
      input
    );

    return { ...result, meta: { ...result.meta, service } };
  },
};
