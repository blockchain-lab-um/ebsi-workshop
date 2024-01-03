import "dotenv/config";

import { createVeramoAgent } from "./createVeramoAgent.js";

const main = async () => {
  // Initialize Veramo agent
  const agent = await createVeramoAgent();

  // Create new Legal Person EBSI DID with local kms and onboard the DID
  const legalEntityIdentifier = await agent.didManagerCreate({
    provider: "did:ebsi",
    alias: "new-ebsi-did",
    kms: "local",
    options: {
      bearer: process.env.EBSI_BEARER_TOKEN,
      keyType: "P-256",
    },
  });

  console.log("New Legal Entity DID created:");
  console.log(legalEntityIdentifier);

  // Create new Natural Person EBSI DID with local kms
  const naturalPersonIdentifier = await agent.didManagerCreate({
    provider: "did:key",
    alias: "new-ebsi-did",
    kms: "local",
    options: {
      keyType: "Secp256r1",
      type: "ebsi",
    },
  });

  console.log("New Natural Person DID created:");
  console.log(naturalPersonIdentifier);

  // Created DIDs can be resolved here:
  // https://hub.ebsi.eu/tools/did-resolver
};

main().catch(console.error);
