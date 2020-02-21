"use strict";

import { setCookie, getCookie } from "./utils";
import { getConfig } from "./config";
import { WithCookie } from "./types/with-cookie";

export function withCookie(instance, cc): WithCookie {
  if (!instance) {
    throw Error("Error: object, function or class required as first param");
  }
  const { noCookie, ssCookie, defaultExp, name } = getConfig(cc);
  const instanceName =
    name || (instance.constructor && instance.constructor.name) || "Object";

  Object.keys(instance).forEach(function(key) {
    const methodType = Object.getOwnPropertyDescriptor(instance, key);
    if (
      typeof instance[key] !== "function" &&
      methodType &&
      !methodType.get &&
      !methodType.set
    ) {
      const blockS = noCookie && noCookie.indexOf(key) !== -1;
      const cookieName = `${instanceName.toLowerCase()}_${key}`;
      let keyV = (!blockS && getCookie(cookieName, ssCookie)) || instance[key];
      const objD = blockS
        ? {
            value: keyV,
            enumerable: true
          }
        : {
            set: function(value) {
              keyV = value;
              if (!blockS) {
                setCookie(cookieName, value, defaultExp);
              }
            },
            get: function() {
              return keyV;
            }
          };

      Object.defineProperty(instance, key, objD);
    }
  });

  return instance;
}
