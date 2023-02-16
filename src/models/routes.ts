export interface RoutePayload {
  path: string;
  main: () => JSX.Element;
}
