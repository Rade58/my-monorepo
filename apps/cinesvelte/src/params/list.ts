import { views } from "$lib/views";
import type { ParamMatcher } from "@sveltejs/kit";

export const match: ParamMatcher = (param) => {
  return param in views;
};
