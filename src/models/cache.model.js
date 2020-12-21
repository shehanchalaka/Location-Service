import { Schema, model } from "mongoose";
import { CACHE_DURATION } from "../config";

const CacheSchema = new Schema({
  type: { type: String },
  input: { type: JSON },
  result: { type: JSON },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: CACHE_DURATION,
  },
});

const Cache = model("Cache", CacheSchema);

export default Cache;
