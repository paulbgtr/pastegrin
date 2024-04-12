import { useLoaderData } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";
import type { Paste } from "@/types/Paste";
import { PastesList } from "@/components/PastesList";

const MyPastes = () => {
  const pastes = useLoaderData() as Paste[];

  return (
    <div>
      <h1 className="text-2xl font-bold">My pastes</h1>

      {pastes.length === 0 ? (
        <>
          <p>No pastes found.</p>
          <a
            className={buttonVariants({ variant: "default" })}
            href="/pastes/new"
          >
            Create your first one!
          </a>
        </>
      ) : (
        <PastesList pastes={pastes} />
      )}
    </div>
  );
};

export default MyPastes;
