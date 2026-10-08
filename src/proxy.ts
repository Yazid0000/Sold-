import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

// Les images de partage (…/opengraph-image) sont exclues : sinon /fr/opengraph-image serait redirigé vers
// /opengraph-image, et certains robots de partage (WhatsApp, LinkedIn…) ne suivent pas les redirections.
export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*opengraph-image|.*\\..*).*)",
};
