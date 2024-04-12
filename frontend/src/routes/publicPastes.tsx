import { useLoaderData } from "react-router-dom";
import type { Paste } from "@/types/Paste";
import { PastesList } from "@/components/PastesList";

const PublicPastes = () => {
  const pastes = useLoaderData() as Paste[];

  return <PastesList pastes={pastes} />;
};

export default PublicPastes;
