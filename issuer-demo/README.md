# Veramo ebsi plugin demo

This project is meant to demonstrate how to easily implement Verifiable Credential issuing.
Issuing is done using a Veramo agent, setup with a did EBSI and did Key providers.

Users can use a did:ebsi identifier to issue verifiable credentials to site visitors.

> The issuer did:ebsi used in this demo has been onboarded and registered as a trusted issuer.

## Getting Started

First, install the dependencies and build the project:

```bash
pnpm install
pnpm build
```

Next, start the local project:

```bash
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
