import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const AddPaste = () => {
  return (
    <div>
      {/* todo: implement form */}
      <h2 className="mb-2">New Paste</h2>
      <div className="grid gap-3">
        <Textarea placeholder="Content" className="min-h-[240px]" />
        <Input type="text" placeholder="Title" />
        <Input type="password" placeholder="Password" />
      </div>
      <Button className="mt-3">Create new paste</Button>
    </div>
  );
};
