export function getCookie(key: string) {
  const b = document.cookie.match('(^|[^;]+)\\s*' + key + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

export function setCookie(key: string, value: string | null) {
  document.cookie = `${key}=${value}`;
}

export const redirectToLogin = (space: number) => {
  window.location.href = `${process.env.VUE_APP_ONEAUTH_URL}/#/realm/${space}/login/${process.env.VUE_APP_ONEAUTH_APP_ID}`;
};
