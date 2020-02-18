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
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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

        return cok && cok !== "false" ? cok : false;
      }
    }
  }

  return "";
}
