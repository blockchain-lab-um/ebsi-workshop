# DEMO

# DID Onboardng

1. Set environment to conformance

```
env conformance
```

2. Create 2 wallets (private keys)

```
using user ES256K
using user ES256
```

3. Request credential to onboard from conformance service

```sh
# This is only available in the conformance environment
# In the pilot environmnt, you need to receive the credential from a Root TAO or TAO
vcOnboard: conformance getCredential onboard
```

4. Onboard the DID (adding it to the DID registry)

- This command does multiple steps, which are described in detail in [onboarding detailed](onboard/detailed.md)

```sh
run registerDidDocument_ES256K_ES256 vcOnboard.vc
```

# Trusted Issuer Registration

1. Request credential to register a trusted issuer from conformance service

```sh
vcTrustedIssuer: conformance getCredential ti
```

2. Request an access token from the Authorisation API using the credential

```sh
# Token scope is `tir_invite` (if this is the first time you register a Trusted Issuer)
responseAuthTIR: authorisation auth tir_invite_presentation ES256 vcTrustedIssuer.vc

# Token scope is `tir_write` (if the issuer already exists)
# responseAuthTIR: authorisation auth tir_write_presentation ES256
```

3. Load the access token

```
using token responseAuthTIR.access_token
```

4. Register the credential

```sh
# Reserved attribute id can be found in the trusted issuer credential we received
tir setAttributeData user.did vcTrustedIssuer.reservedAttributeId vcTrustedIssuer.vc
```

5. Check the registration

```
set vcTrustedIssuer.url https://api-conformance.ebsi.eu/trusted-issuers-registry/v4/issuers/ user.did /attributes/ vcTrustedIssuer.reservedAttributeId
```
