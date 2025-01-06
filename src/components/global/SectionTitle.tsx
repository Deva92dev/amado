import { Separator } from "../ui/separator";

const SectionTitle = ({ text }: { text: string }) => {
  return (
    <div>
      <h2 className="capitalize mb-8 tracking-wider font-medium text-3xl">
        {text}
      </h2>
      <Separator />
    </div>
  );
};

export default SectionTitle;
