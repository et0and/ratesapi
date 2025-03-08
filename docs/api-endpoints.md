# API Endpoints

The API exposes the following endpoint categories:

- **Mortgage Rates**: `/api/v1/mortgage-rates`
  - List all mortgage rates
  - Get rates by institution
  - Get historical rates time series

- **Personal Loan Rates**: `/api/v1/personal-loan-rates`
  - List all personal loan rates
  - Get rates by institution
  - Get historical rates time series

- **Car Loan Rates**: `/api/v1/car-loan-rates`
  - List all car loan rates
  - Get rates by institution
  - Get historical rates time series

- **Credit Card Rates**: `/api/v1/credit-card-rates`
  - List all credit card rates
  - Get rates by issuer
  - Get historical rates time series

All endpoints support CORS and return JSON responses with a 5-second cache control.

## API Documentation

- OpenAPI documentation is available at: `/api/v1/doc`
- Swagger UI is available in development mode at the root URL
- Production redirects to: [https://docs.ratesapi.nz](https://docs.ratesapi.nz)