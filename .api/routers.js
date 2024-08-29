
// Imports
import * as _0_0 from "@api/root/src/api/geninvoice.tsx";
import * as configure from "@api/configure";

export const routeBase = "/api";

const internal  = [
  _0_0.default && {
        source     : "src/api/geninvoice.tsx?fn=default",
        method     : "use",
        route      : "/geninvoice",
        path       : "/api/geninvoice",
        url        : "/api/geninvoice",
        cb         : _0_0.default,
      },
  _0_0.GET && {
        source     : "src/api/geninvoice.tsx?fn=GET",
        method     : "get",
        route      : "/geninvoice",
        path       : "/api/geninvoice",
        url        : "/api/geninvoice",
        cb         : _0_0.GET,
      },
  _0_0.PUT && {
        source     : "src/api/geninvoice.tsx?fn=PUT",
        method     : "put",
        route      : "/geninvoice",
        path       : "/api/geninvoice",
        url        : "/api/geninvoice",
        cb         : _0_0.PUT,
      },
  _0_0.POST && {
        source     : "src/api/geninvoice.tsx?fn=POST",
        method     : "post",
        route      : "/geninvoice",
        path       : "/api/geninvoice",
        url        : "/api/geninvoice",
        cb         : _0_0.POST,
      },
  _0_0.PATCH && {
        source     : "src/api/geninvoice.tsx?fn=PATCH",
        method     : "patch",
        route      : "/geninvoice",
        path       : "/api/geninvoice",
        url        : "/api/geninvoice",
        cb         : _0_0.PATCH,
      },
  _0_0.DELETE && {
        source     : "src/api/geninvoice.tsx?fn=DELETE",
        method     : "delete",
        route      : "/geninvoice",
        path       : "/api/geninvoice",
        url        : "/api/geninvoice",
        cb         : _0_0.DELETE,
      }
].filter(it => it);

export const routers = internal.map((it) => {
  const { method, path, route, url, source } = it;
  return { method, url, path, route, source };
});

export const endpoints = internal.map(
  (it) => it.method?.toUpperCase() + "\t" + it.url
);

export const applyRouters = (applyRouter) => {
  internal.forEach((it) => {
    it.cb = configure.callbackBefore?.(it.cb, it) || it.cb;
    applyRouter(it);
  });
};

