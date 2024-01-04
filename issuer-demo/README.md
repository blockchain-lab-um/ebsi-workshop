# Veramo ebsi plugin demo

This project is meant to demonstrate how to easily implement Verifiable Credential issuing.
Issuing is done using a Veramo agent, setup with a did EBSI and did Key providers.

Users can use a did:ebsi identifier to issue verifiable credentials to site visitors.

## Getting Started

First, setup a `.env.local` file in the root of the project.
Set environment variables based on the `.env.example` file

There are functions available to support multiple functionalities of working with dids.
Setup the `.env.local` variables accordingly

To create a new DID EBSI, using a generated key only the `EBSI_BEARER_TOKEN` is required.
To create a new DID EBSI, using an existing key, `EBSI_BEARER_TOKEN`, `EBSI_PRIVATE_KEY` and `EBSI_ID` are required.
To import an existing DID EBSI identifier into veramo, `EBSI_PRIVATE_KEY` and `EBSI_DID` are required.

The EBSI Bearer Token is available at [EBSI Users Onboarding service](https://app-pilot.ebsi.eu/users-onboarding/v2).
Select `Onboard with Captcha` and then `Desktop Wallet`, copy the provided session token into `.env` file.

Second, install the dependencies and start the local development server:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Additional info

We have provided a script, located in the `issuer-demo/scripts/generate_credentials.sh` file.
The script generates a random valid Secp256r1 private key and a random EBSI id.
