import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { UpdatePaste } from "@/routesComponents/pastes/id/UpdatePaste";
import { VerifyPaste } from "@/routesComponents/pastes/id/VerifyPaste";

interface PasteData {
  id: number;
  content: string;
  title: string;
}

const ViewPaste = () => {
  const [isVerified, setIsVerified] = useState(false);
  const { id, title, content, password } = useLoaderData<PasteData>();

  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  if (!content) throw new Error("Paste not found");

  if (password && !isVerified)
    return <VerifyPaste id={id} onVerifySuccess={handleVerificationSuccess} />;

  return (
    <UpdatePaste id={id} content={content} title={title} password={password} />
  );
};

export default ViewPaste;
