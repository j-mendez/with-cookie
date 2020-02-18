"use strict";

import { setCookie, getCookie } from "./utils";
import { getConfig } from "./config";
import { WithCookie } from "./types/with-cookie";

export function withCookie(instance, cc): WithCookie {
  const { noCookie, ssCookie, defaultExp } = getConfig(cc);

  Object.keys(instance).forEach(function(key) {
    const methodType = Object.getOwnPropertyDescriptor(instance, key);
    if (
      typeof instance[key] !== "function" &&
      methodType &&
      !methodType.get &&
      !methodType.set
    ) {
      const blocksave = noCookie && noCookie.indexOf(key) !== -1;
      const cookieName = `${key}_ck`;

      let keyV =
        (!blocksave && getCookie(cookieName, ssCookie)) || instance[key];

      if (blocksave) {
        Object.defineProperty(instance, key, {
          value: keyV,
          enumerable: true
        });
      } else {
        Object.defineProperty(instance, key, {
          set: function(value) {
            keyV = value;
            if (!blocksave) {
              setCookie(cookieName, value, defaultExp);
            }
          },
          get: function() {
            return keyV;
          }
        });
      }
    }
  });

  return instance;
}
