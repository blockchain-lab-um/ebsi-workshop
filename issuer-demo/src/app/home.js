"use client";

import IssueForm from "./components/issueForm";
import CredentialDisplay from "./components/credentialDisplay";
import { useState } from "react";

export const Home = () => {
  const [credential, setCredential] = useState();

  return (
    <div className="flex min-h-screen place-items-center content-center justify-evenly p-10">
      {credential ? (
        <CredentialDisplay
          credential={credential}
          setCredential={setCredential}
        />
      ) : (
        <IssueForm setCredential={setCredential} />
      )}
    </div>
  );
};
