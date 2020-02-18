"use strict";

export function setCookie(
  cname: string,
  cvalue: any,
  exdays: number = 365
): void {
  let d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  if (
    typeof document !== "undefined" &&
    typeof navigator !== "undefined" &&
    navigator.cookieEnabled
  ) {
    const cok =
      cvalue &&
      (cvalue === "[object Object]" ||
        cvalue.constructor.name === "Object" ||
        Array.isArray(cvalue))
        ? JSON.stringify(cvalue)
        : cvalue;

    document.cookie = cname + "=" + cok + ";" + expires + ";path=/";
  }
}

export function getCookie(cname: string, cookie: string | string[]): any {
  let name = cname + "=";
  let ca = cookie;

  if (
    !ca &&
    typeof document !== "undefined" &&
    typeof navigator !== "undefined" &&
    navigator.cookieEnabled &&
    document.cookie
  ) {
    ca = document.cookie.split(";");
  }
  if (ca && ca.length) {
    for (var i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        let cok = c.substring(name.length, c.length);

        if (cok) {
          const cjp = cok.length >= 2;

          if (
            (cjp && cok[0] === "{" && cok[cok.length - 1] === "}") ||
            (cjp && cok[0] === "[" && cok[cok.length - 1] === "]")
          ) {
            return JSON.parse(cok);
          } else if (cok === "false") {
            return false;
          } else if (cok === "null") {
            return null;
          } else if (cok === "undefined") {
            return undefined;
          } else {
            return cok;
          }
        }
        return "";
      }
    }
  }

  return "";
}
