# EBSI DID Onboarding v4 (Detailed)

## Commands

1. Creates 2 wallets

```
   using user ES256K
   using user ES256
```

2. Connect to the desired network

```
   env pilot
```

3. View the user DID

```
view user.id
```

4. Request an "invite" access token

```sh
# Token scope is `did_invite`
# This command interacts with the Authorisation API
resAuthDIDRInvite: authorisation auth didr_invite_presentation ES256 <VC_TO_ONBOARD>
```

5. Load the access token

```
using token resAuthDIDRInvite.access_token
```

6. Insert the ES256K key into the authentication and capabilityInvocation fields in the did document

```sh
# This command interacts with the DID Registry
did insertDidDocument
```

7. Request and "write" access token

```sh
# Token scope is `did_write`
# This command interacts with the Authorisation API
resAuthDIDRWrite: authorisation auth didr_write_presentation ES256K
```

8. Load the access token

```
using token resAuthDIDRWrite.access_token
```

9. Insert ES256 key as verification method

```
did addVerificationMethod user.did ES256
```

10. Create relationship "authentication" with this verification method

```
did addVerificationRelationship user.did authentication ES256
```

11. Now the same is done for the assertion method

```
did addVerificationRelationship user.did assertionMethod ES256
```
