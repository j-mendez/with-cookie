import { ConfigCookie } from "./types/with-cookie";

export function getConfig(cc: ConfigCookie): ConfigCookie {
  let defaultExp = 30;
  let noCookie;
  let ssCookie;
  let name;

  if (cc) {
    if (typeof cc.defaultExp === "number") {
      defaultExp = cc.defaultExp;
    }

    if (Array.isArray(cc.noCookie)) {
      noCookie = cc.noCookie;
    }

    if (typeof cc.ssCookie === "string") {
      ssCookie = cc.ssCookie;
    }

    if (typeof cc.name === "string") {
      name = cc.name;
    }
  }

  return {
    defaultExp,
    noCookie,
    ssCookie,
    name
  };
}
