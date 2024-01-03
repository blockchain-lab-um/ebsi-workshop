# Veramo EBSI Demo

## Introduction

This demo shows:

- how to create EBSI Legal Entity DIDs using the Veramo DID EBSI Provider.
- how to create EBSI Natural Person DIDs using the Veramo DID Key Provider.

### Requirements

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)

### Installation

```bash
pnpm install
```

### Running

```bash
pnpm start
```

## Usage

1. Visit https://app-pilot.ebsi.eu/users-onboarding/v2
2. Press "Onboard with Captcha"
3. Press "Desktop Wallet"
4. Copy the provided Session token
5. Add token to the `.env` file as `EBSI_BEARER_TOKEN`
6. RUN `pnpm start`

### Example output

```js
// New Legal Entity DID created:
{
  did: 'did:ebsi:zhXRUWjvZWY1vKTZ8MBFFnm',
  controllerKeyId: 'did:ebsi:zhXRUWjvZWY1vKTZ8MBFFnm#mfuEWqM5HZ-EwEmOtb1y68fBoPNz_3Xfi9R7mV-Z2M4',
  keys: [
    {
      type: 'Secp256r1',
      kid: 'did:ebsi:zhXRUWjvZWY1vKTZ8MBFFnm#mfuEWqM5HZ-EwEmOtb1y68fBoPNz_3Xfi9R7mV-Z2M4',
      publicKeyHex: '02298cc1b7cd1ab7eed3bee25b464462ff945897c5d4c63cdf3e9cc9e448cbdf99',
      meta: [Object],
      kms: 'local'
    }
  ],
  services: [],
  provider: 'did:ebsi',
  alias: 'new-ebsi-did'
}

// New Natural Person DID created:
{
  did: 'did:key:z2dmzD81cgPx8Vki7JbuuMmFYrWPgYoytykUZ3eyqht1j9KbrqYWc17mAt4bRJxAjN3ShGCJZsdit9XAAu2on3GBLQwaptQiZGEpFnkHFJWvadBvw8jWeBNVTSm3ou9zsytAJmzsQn4A2FUsvVsxmBjbDN6KK1b8CZRD3Twz3YFAfFRSZS',
  controllerKeyId: '038914303941304bbdbc82163f755114795db9290294e9a2fd09e299f82bfea909',
  keys: [
    {
      type: 'Secp256r1',
      kid: '038914303941304bbdbc82163f755114795db9290294e9a2fd09e299f82bfea909',
      publicKeyHex: '038914303941304bbdbc82163f755114795db9290294e9a2fd09e299f82bfea909',
      meta: [Object],
      kms: 'local'
    }
  ],
  services: [],
  provider: 'did:key',
  alias: 'new-ebsi-did'
}
```

## EBSI DID Provider

### Introduction

The EBSI DID Provider is a Veramo DID Provider that allows you to create and resolve EBSI DIDs.

### Steps

1. Creates a new EBSI DID using the Secp256r1 key type
2. Request a Verifiable Authorization from the EBSI Authorization API (using the Bearer token and signed ID Token)

```ts
const idToken = {
  sub: subject,
  sub_jwk: args.keyJwks.publicKeyJwk,
  nonce: uuidv4(),
  responseMode: "form_post",
};
```

```ts
const idTokenJwt = await new jose.SignJWT(idToken)
  .setProtectedHeader({ alg, typ: "JWT", kid })
  .setIssuedAt()
  .setAudience(`${BASE_URL}/users-onboarding/v2/authentication-responses`)
  .setIssuer("https://self-issued.me/v2")
  .setExpirationTime("1h")
  .sign(privateKey);
```

3. Creates a new Verifiable Presentation based on the Verifiable Authorization.
4. Creates a response ID Token using siopV2
5. Create a SIOP session by sending the ID Token and VP Token to the EBSI Authorization API `${BASE_URL}/authorisation/v2/siop-sessions`
6. Prepares a blockchain transaction to insert the created EBSI DID Document into the EBSI DID Registry
7. The unsigned transaction is sent to the EBSI DID Registry API `${BASE_URL}/did-registry/v3/jsonrpc` using the `insertDidDocument` RPC method

```ts
const jsonRpcBody = {
  jsonrpc: "2.0",
  method: "insertDidDocument",
  id: Math.ceil(Math.random() * 1000),
  params: [...],
};
```

8. The received response is then signed using the DID's key and sent back to the EBSI DID Registry API `${BASE_URL}/did-registry/v3/jsonrpc` using the `sendSignedTransaction` RPC method

```ts
const jsonRpcBody = {
  jsonrpc: "2.0",
  method: "sendSignedTransaction",
  params: [signedTx],
  id: Math.ceil(Math.random() * 1000),
};
```
