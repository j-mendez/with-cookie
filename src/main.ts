"use strict";

import { setCookie, getCookie } from "./utils";
import { WithCookie } from "./types/with-cookie";

export function withCookie(
  instance,
  config = {
    defaultExp: 30,
    noCache: [""],
    ssCookie: ""
  }
): WithCookie {
  Object.keys(instance).forEach(function(key) {
    const methodType = Object.getOwnPropertyDescriptor(instance, key);
    if (
      typeof instance[key] !== "function" &&
      methodType &&
      !methodType.get &&
      !methodType.set
    ) {
      const blockCache =
        config && config.noCache && config.noCache.indexOf(key) !== -1;

      const cookieName = `${key}_cookie`;
      const keyMap = {
        [key]:
          (!blockCache && getCookie(cookieName, config.ssCookie)) ||
          instance[key]
      };

      Object.defineProperty(instance, key, {
        set: function(value) {
          keyMap[key] = value;
          if (!blockCache) {
            setCookie(cookieName, value, config.defaultExp);
          }
        },
        get: function() {
          return keyMap[key];
        }
      });
    }
  });

  return instance;
}
