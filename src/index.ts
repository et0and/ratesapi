import { cache } from "hono/cache";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { routes as mortgageRatesRoutes } from "./routes/mortgage-rates";
import { routes as personalLoanRatesRoutes } from "./routes/personal-loan-rates";
import { routes as carLoanRatesRoutes } from "./routes/car-loan-rates";
import { routes as creditCardRatesRoutes } from "./routes/credit-card-rates";
import { Institution } from "./models/institution";
import { Product } from "./models/product";
import { Rate } from "./models/rate";
import { Issuer } from "./models/issuer";
import { Plan } from "./models/plan";

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    const environment: string | undefined =
      String(c.env?.ENVIRONMENT) ?? undefined;

    if (environment === "production") {
      console.log("Running in production mode");
    } else {
      console.log("Running in development mode");
    }

    if (!result.success) {
      return c.json(
        {
          code: 500,
          message: "A server error occurred while processing the request",
        },
        500
      );
    }
  },
});

app.use(
  "*",
  prettyJSON(),
  cache({
    cacheName: "rates-api",
    cacheControl: "public, max-age=300, must-revalidate",
  })
);

app.use(
  "/api/v1/*",
  cors({
    origin: "*",
    maxAge: 600,
  })
);

// Routes
app.route("/api/v1/mortgage-rates", mortgageRatesRoutes);
app.route("/api/v1/personal-loan-rates", personalLoanRatesRoutes);
app.route("/api/v1/car-loan-rates", carLoanRatesRoutes);
app.route("/api/v1/credit-card-rates", creditCardRatesRoutes);

// Models
app.openAPIRegistry.register("Institution", Institution);
app.openAPIRegistry.register("Issuer", Issuer);
app.openAPIRegistry.register("Product", Product);
app.openAPIRegistry.register("Plan", Plan);
app.openAPIRegistry.register("Rate", Rate);

// OpenAPI documentation
// Route: `GET /api/v1/doc`
app.doc31("/api/v1/doc", {
  openapi: "3.1.0",
  info: {
    version: "1.0.0",
    title: "Rates API",
    description:
      "Rates API is a free OpenAPI service to retrieve the latest lending rates offered by New Zealand financial institutions — updated hourly.",
  },
  servers: [
    {
      url: "https://ratesapi.nz",
      description: "Production",
    },
    {
      url: "http://localhost:8787",
      description: "Local",
    },
  ],
});

// Swagger UI - only in development – production redirects to the documentation
app.get("/", async (c, next) => {
  const environment: string | undefined =
    String(c.env?.ENVIRONMENT) ?? undefined;

  if (environment === "production") {
    return c.redirect("https://docs.ratesapi.nz");
  }
  // Serve SwaggerUI in non-production (or other environments)
  return swaggerUI({ url: "/api/v1/doc" })(c, next);
});

export default app;
