import { useLoaderData } from "react-router-dom";
import { UpdatePaste } from "@/rootsComponents/pastes/UpdatePaste";

interface PasteData {
  id: number;
  content: string;
  title: string;
}

const Paste = () => {
  const { id, title, content, password } = useLoaderData<PasteData>();

  if (!content) throw new Error("Paste not found");

  return (
    <UpdatePaste id={id} content={content} title={title} password={password} />
  );
};

export default Paste;
