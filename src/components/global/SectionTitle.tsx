import { Separator } from "../ui/separator";

type SectionTitleProps = { text: string };

const SectionTitle = ({ text }: SectionTitleProps) => {
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
