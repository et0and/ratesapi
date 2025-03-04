import { createRoute, z } from "@hono/zod-openapi";
import { GenericApiError } from "../../models/api";
import { PersonalLoanRates } from "../../models/personal-loan-rates";

const ParamsSchema = z.object({
  institutionId: z.string().openapi({
    param: {
      name: "institutionId",
      in: "path",
    },
    examples: [
      "institution:anz",
      "institution:asb",
      "institution:bnz",
      "institution:kiwibank",
      "institution:westpac",
    ],
  }),
});

export const getPersonalLoanRatesByInstitutionRoute = createRoute({
  operationId: "getPersonalLoanRatesByInstitution",
  method: "get",
  path: "/{institutionId}",
  request: {
    params: ParamsSchema,
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: PersonalLoanRates.extend({
            termsOfUse: z.string().openapi({}),
            timestamp: z.string().openapi({
              description: "Current server timestamp",
              example: "2025-03-04T02:30:00.000Z",
            }),
          }),
        },
      },
      description: "Retrieve all personal loan rates for all institutions",
    },
    404: {
      content: {
        "application/json": {
          schema: GenericApiError,
        },
      },
      description: "Institution not found",
    },
    500: {
      content: {
        "application/json": {
          schema: GenericApiError,
        },
      },
      description: "A server error occurred while processing the request",
    },
  },
});
