let name = "dxpstudio-cookieconsent";

// sets the cookie
export function setCookie(value) {
  let date = new Date();
  date.setTime(date.getTime() + (1 * 24 * 60 * 60 * 1000)); //convert date UTC timestamp into a number
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`
}

// returns the cookie with the given name, 'undefined' if not found
export function getCookie() {
  if(typeof window !== "undefined") {
    let matches = document.cookie.match(new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  }
}