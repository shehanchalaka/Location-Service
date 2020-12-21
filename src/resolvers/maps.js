import { Maps } from "../services";

export default {
  Query: {
    geocode: (_, { input }) => Maps.geocode(input),
    autocomplete: (_, { input }) => Maps.autocomplete(input),
  },
};
