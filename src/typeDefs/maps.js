import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    geocode(input: JSON): JSON
    autocomplete(input: JSON): JSON
  }
`;
