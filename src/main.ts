"use strict";

import { setCookie, getCookie } from "./utils";
import { WithCookie } from "./types/with-cookie";

export function withCookie(instance, cc): WithCookie {
  const config = {
    defaultExp: 30,
    noCookie: [""],
    ssCookie: "",
    ...cc
  };
  Object.keys(instance).forEach(function(key) {
    const methodType = Object.getOwnPropertyDescriptor(instance, key);
    if (
      typeof instance[key] !== "function" &&
      methodType &&
      !methodType.get &&
      !methodType.set
    ) {
      const blocksave =
        config && config.noCookie && config.noCookie.indexOf(key) !== -1;
      const cookieName = `${key}_ck`;
      let keyVal =
        (!blocksave && getCookie(cookieName, config.ssCookie)) || instance[key];

      Object.defineProperty(instance, key, {
        set: function(value) {
          keyVal = value;
          if (!blocksave) {
            setCookie(cookieName, value, config.defaultExp);
          }
        },
        get: function() {
          return keyVal;
        }
      });
    }
  });

  return instance;
}
