import { ConfigCookie } from "./types/with-cookie";

export function getConfig(cc: ConfigCookie): ConfigCookie {
  let defaultExp = 30;
  let noCookie;
  let ssCookie;

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
  }

  return {
    defaultExp,
    noCookie,
    ssCookie
  };
}
