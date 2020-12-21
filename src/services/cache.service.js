import { Cache } from "../models";

export const useCache = async (type, func, input) => {
  let source = "cache";

  const found = await Cache.findOne({ type, input });
  let result = found?.result;

  if (!result) {
    result = await func(input);
    await Cache.create({ type, input, result });
    source = "network";
  }

  return { result, meta: { source } };
};
