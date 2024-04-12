import type { Paste } from "@/types/paste";
import { SinglePaste } from "@/components/SinglePaste";

export const PastesList = ({ pastes }: { pastes: Paste[] }) => {
  return (
    <div className="grid gap-3 lg:grid-cols-4 xl:grid-cols-5 md:grid-cols-3">
      {pastes.map((p: Paste) => {
        return (
          <SinglePaste
            key={p.id}
            title={p.title}
            content={p.content}
            isPrivate={p.isPrivate}
          />
        );
      })}
    </div>
  );
};
