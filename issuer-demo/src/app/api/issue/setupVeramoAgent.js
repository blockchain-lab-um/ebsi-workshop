import { createAgent } from "@veramo/core";
import { CredentialPlugin } from "@veramo/credential-w3c";
import { DIDResolverPlugin } from "@veramo/did-resolver";
import {
  KeyManager,
  MemoryKeyStore,
  MemoryPrivateKeyStore,
} from "@veramo/key-manager";
import { KeyManagementSystem } from "@veramo/kms-local";
import { Resolver } from "did-resolver";
import {
  KeyDIDProvider,
  getDidKeyResolver as keyDidResolver,
} from "@blockchain-lab-um/did-provider-key";
import {
  EbsiDIDProvider,
  ebsiDidResolver,
} from "@blockchain-lab-um/did-provider-ebsi";
import { DIDManager, MemoryDIDStore } from "@veramo/did-manager";

export const createVeramoAgent = async () => {
  const didProviders = {};

  didProviders["did:key"] = new KeyDIDProvider({ defaultKms: "local" });
  didProviders["did:ebsi"] = new EbsiDIDProvider({ defaultKms: "local" });

  return createAgent({
    plugins: [
      new CredentialPlugin(),
      new KeyManager({
        store: new MemoryKeyStore(),
        kms: {
          local: new KeyManagementSystem(new MemoryPrivateKeyStore()),
        },
      }),
      new DIDResolverPlugin({
        resolver: new Resolver({
          ...keyDidResolver(),
          ...ebsiDidResolver(),
        }),
      }),
      new DIDManager({
        store: new MemoryDIDStore(),
        defaultProvider: "did:ebsi",
        providers: didProviders,
      }),
    ],
  });
};

export const createEBSIIdentifier = async (agent) => {
  return await agent.didManagerCreate({
    provider: "did:ebsi",
    alias: "ebsi",
    kms: "local",
    options: {
      keyType: "P-256",
      subjectIdentifier: "ztyxjmDi9wcA6z9vNi5b9zf",
      privateKeyJwk: {
        kty: "EC",
        x: "J0NjM-Jq8JtQHXaWerODm4e6ieJk5EOyHEiSX8632w8",
        y: "-HQEhp2BmymNlIzoteJMyqlycoLLuicaUNuGaK8yu_w",
        crv: "P-256",
        d: "0LRTJccYNQSpcZ5Y4gt8WsY6nXro4_LfVLHppaL3IHQ",
      },
      publicKeyJwk: {
        kty: "EC",
        x: "J0NjM-Jq8JtQHXaWerODm4e6ieJk5EOyHEiSX8632w8",
        y: "-HQEhp2BmymNlIzoteJMyqlycoLLuicaUNuGaK8yu_w",
        crv: "P-256",
      },
    },
  });
};
