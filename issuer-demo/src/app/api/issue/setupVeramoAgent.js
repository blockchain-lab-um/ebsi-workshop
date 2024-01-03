import { createAgent } from '@veramo/core';
import { CredentialPlugin } from '@veramo/credential-w3c';
import { DIDResolverPlugin } from '@veramo/did-resolver';
import {
	KeyManager,
	MemoryKeyStore,
	MemoryPrivateKeyStore,
} from '@veramo/key-manager';
import { KeyManagementSystem } from '@veramo/kms-local';
import { Resolver } from 'did-resolver';
import {
	KeyDIDProvider,
	getDidKeyResolver as keyDidResolver,
} from '@blockchain-lab-um/did-provider-key';
import {
	EbsiDIDProvider,
	ebsiDidResolver,
} from '@blockchain-lab-um/did-provider-ebsi';
import { DIDManager, MemoryDIDStore } from '@veramo/did-manager';

export const createVeramoAgent = async () => {
	const didProviders = {};

	didProviders['did:key'] = new KeyDIDProvider({ defaultKms: 'local' });
	didProviders['did:ebsi'] = new EbsiDIDProvider({ defaultKms: 'local' });

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
				defaultProvider: 'did:ebsi',
				providers: didProviders,
			}),
		],
	});
};

export const createEBSIIdentifier = async (agent) => {
	return await agent.didManagerCreate({
		provider: 'did:ebsi',
		alias: 'ebsi',
		kms: 'local',
		options: {
			bearer: process.env.EBSI_BEARER_TOKEN,
			privateKeyHex: process.env.EBSI_PRIVATE_KEY,
			keyType: 'P-256',
			id: process.env.EBSI_ID,
		},
	});
};

export const createRandomEBSIIdentifier = async (agent) => {
	return await agent.didManagerCreate({
		provider: 'did:ebsi',
		alias: 'new-ebsi-did',
		kms: 'local',
		options: {
			bearer: process.env.EBSI_BEARER_TOKEN,
			keyType: 'P-256',
		},
	});
};

export const importEBSIIdentifier = async (agent) => {
	return await agent.didManagerImport({
		did: process.env.EBSI_DID, // did to import
		provider: 'did:ebsi',
		alias: 'issuer-primary', // alias to use when referring to this DID
		keys: [
			// keys to import that are referencable by the controller
			{
				kid: 'ebsiKey', // id of the key
				type: 'Secp256r1',
				kms: 'local',
				privateKeyHex: process.env.EBSI_PRIVATE_KEY,
			},
		],
	});
};
