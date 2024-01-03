import { createRandomEBSIIdentifier, createVeramoAgent } from './setupVeramoAgent';
import { NextResponse } from 'next/server';

const agent = await createVeramoAgent();
const identifier = await createRandomEBSIIdentifier(agent);

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams
    const name = searchParams.get('name')
    // Issue a new credential
    const credential = await agent.createVerifiableCredential({
      credential: {
        issuer: {
          id: identifier.did,
        },
        credentialSubject: {
          name: name,
        },
        credentialSchema: {
          id: "https://schema.org/examples/Person",
          type: "JsonSchemaValidator2018",
          name: "Person",
          description: "A person",
          required: ["name"],
          properties: {
            name: {
              type: "string",
              description: "The person's name.",
            },
          },
        },
      },
      proofFormat: "jwt",
    });
  
    return NextResponse.json(credential, {status: 201});
  } catch (error) {
    return NextResponse.error(error, {status: 500});
  }
}