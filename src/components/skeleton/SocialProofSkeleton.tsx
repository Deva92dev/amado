interface SocialProofCardSkeletonProps {
  aspectRatio: "square" | "tall" | "wide";
}

const SocialProofCardSkeleton = ({
  aspectRatio,
}: SocialProofCardSkeletonProps) => {
  const getRowSpan = (aspectRatio: "square" | "tall" | "wide") => {
    switch (aspectRatio) {
      case "tall":
        return "lg:row-span-2";
      case "wide":
        return "lg:col-span-2";
      case "square":
        return "row-span-1";
    }
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden bg-muted animate-pulse ${getRowSpan(
        aspectRatio
      )}`}
    >
      <div className="w-full h-full bg-muted-foreground/20" />
      <div className="absolute bottom-0 left-0 p-4 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-muted-foreground/30" />
            <div className="h-4 w-24 rounded bg-muted-foreground/30" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-4 w-8 rounded bg-muted-foreground/30" />
            <div className="h-4 w-8 rounded bg-muted-foreground/30" />
          </div>
        </div>
      </div>
    </div>
  );
};
export const SocialProofGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[250px] gap-4">
      <SocialProofCardSkeleton aspectRatio="tall" />
      <SocialProofCardSkeleton aspectRatio="square" />
      <SocialProofCardSkeleton aspectRatio="square" />
      <SocialProofCardSkeleton aspectRatio="square" />
      <SocialProofCardSkeleton aspectRatio="square" />
      <SocialProofCardSkeleton aspectRatio="wide" />
      <SocialProofCardSkeleton aspectRatio="square" />
      <SocialProofCardSkeleton aspectRatio="tall" />
    </div>
  );
};
