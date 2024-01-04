import { createEBSIIdentifier, createVeramoAgent } from "./setupVeramoAgent";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const agent = await createVeramoAgent();
const identifier = await createEBSIIdentifier(agent);

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = decodeURIComponent(searchParams.get("name"));
    const did = decodeURIComponent(searchParams.get("did"));
    // Issue a new credential
    const credential = await agent.createVerifiableCredential({
      credential: {
        issuer: {
          id: identifier.did,
        },
        credentialSubject: {
          id: did,
          name: name,
        },
        type: ["VerifiableCredential", "PersonCredential"],
        credentialSchema: {
          id: "https://example.org/examples/person.json",
          type: "JsonSchemaValidator2018",
        },
      },
      proofFormat: "jwt",
    });

    return NextResponse.json(credential, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
