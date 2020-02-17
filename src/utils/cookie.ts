"use strict";

export function setCookie(
  cname: string,
  cvalue: any,
  exdays: number = 365
): void {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toUTCString();
  if (
    typeof document !== "undefined" &&
    typeof navigator !== "undefined" &&
    navigator.cookieEnabled
  ) {
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
}

export function getCookie(cname: string, cookie: string | string[]): any {
  var name = cname + "=";
  var ca = cookie;

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
      var c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        var cok = c.substring(name.length, c.length);

        return cok && cok !== "false" ? cok : false;
      }
    }
  }

  return "";
}
