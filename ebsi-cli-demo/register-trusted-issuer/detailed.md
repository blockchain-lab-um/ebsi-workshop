# EBSI Registering trusted issuer

## Commands

1. Load the 2 wallets that were onboarded

```
using user ES256K did1 <ISSUER_PRIVATE_KEY_ES256K> <ISSUER_DID>
using user ES256 did1 <ISSUER_PRIVATE_KEY_ES256> <ISSUER_DID>
```

2. Connect to the desired network

```
env pilot
```

3. Pre-registration

```sh
# Pre-registration of the new issuer in the Trusted Issuers Registry needs to be done by
# the Support office (or the respective parent issuer)
# Command to check if the issuer is already registered
tir get /issuers/ user.did
```

4. Request an access token

```sh
# Token scope is `did_invite` (if this is the first time you register a Trusted Issuer)
# Token scope is `did_write` (if the issuer already exists)
# This command interacts with the Authorisation API
# For first time
resAuthTIR: authorisation auth tir_invite_presentation ES256 <VC_ISSUER>
# For existing issuers
resAuthTIR: authorisation auth tir_write_presentation ES256
```

5. Load the access token

```
using token resAuthTIR.access_token
```

6. Register the issuer credential

```sh
# Reserved attribute id can be found in the verifiable credential's credential subject
tir setAttributeData user.did <RESERVED_ATTRIBUTE_ID> <VC_ISSUER>
```

7. Verify that the credential is registered

```
tir get /issuers/ user.did
```
