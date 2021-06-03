export function getCookie(key: string) {
  const b = document.cookie.match('(^|[^;]+)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

export function setCookie(key: string, value: string) {
  document.cookie = `${key}=${value}`;
}

export const redirectToLogin = (space: string) => {
  window.location.href = `${process.env.VUE_APP_ONEAUTH_URL}/#/space/${space}/login?appId=${process.env.VUE_APP_ONEAUTH_APP_ID}`;
};
