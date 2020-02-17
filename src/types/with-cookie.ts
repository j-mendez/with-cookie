/**
 * WithCookie auto binds a object or class properties to a cookie.
 * This is used to create a cookie off of your normal object props.
 *
 * @template I The instance to mutate object properties.
 * @template C The configuration for the cookie binding.
 */
export type WithCookie<I = any, C = ConfigCookie> = (
  instance: I | undefined,
  config: C
) => I;

interface ConfigCookie {
  defaultExp: number;
  noCache?: [string];
  ssCookie?: string;
}