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

/*
 * Function create a Veramo agent with the following plugins:
 * - CredentialPlugin: plugin to issue and verify W3C credentials
 * - KeyManager: plugin to manage keys
 * - DIDResolverPlugin: plugin to resolve DIDs
 * - DIDManager: plugin to manage DIDs
 *
 * The agent is configured with:
 * - a local kms
 * - a memory key store
 * - a memory private key store
 * - a memory DID store
 * - a key DID provider (with support for EBSI Natural Person DIDs)
 * - an EBSI DID provider (adds support for EBSI Legal Person DIDs)
 */
export const createVeramoAgent = async () => {
  const didProviders = {};

  // Add KeyDIDProvider and EbsiDIDProvider to the agent
  didProviders["did:key"] = new KeyDIDProvider({ defaultKms: "local" });
  didProviders["did:ebsi"] = new EbsiDIDProvider({ defaultKms: "local" });

  return createAgent({
    plugins: [
      // The CredentialPlugin is required to issue and verify W3C credentials
      new CredentialPlugin(),
      // The KeyManager plugin is required to manage keys
      new KeyManager({
        store: new MemoryKeyStore(),
        kms: {
          local: new KeyManagementSystem(new MemoryPrivateKeyStore()),
        },
      }),
      // The DIDResolverPlugin is required to resolve DIDs
      new DIDResolverPlugin({
        resolver: new Resolver({
          ...keyDidResolver(),
          ...ebsiDidResolver(),
        }),
      }),
      // The DIDManager plugin is required to manage DIDs
      new DIDManager({
        store: new MemoryDIDStore(),
        defaultProvider: "did:ebsi",
        providers: didProviders,
      }),
    ],
  });
};
