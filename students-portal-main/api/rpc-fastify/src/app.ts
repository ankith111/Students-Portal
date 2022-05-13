import { join } from "path";
import AutoLoad, { AutoloadPluginOptions } from "fastify-autoload";
import { FastifyPluginAsync } from "fastify";
import { dirname } from "path";
import { fileURLToPath } from "url";
import helmet from "fastify-helmet";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  // Place here your custom code!
  void fastify.register(
    helmet,
    // Example disables the `contentSecurityPolicy` middleware but keeps the rest.
    { contentSecurityPolicy: false,  }
  )
  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  

  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });


};

export default app;
export { app };
