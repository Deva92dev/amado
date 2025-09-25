import { StarHalfIcon, StarIcon } from "lucide-react";

const Rating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);

  return (
    <div className="flex items-center gap-x-1">
      {stars.map((isFilled, i) => {
        const className = `w-3 h-3 ${
          isFilled ? "text-primary" : "text-gray-500"
        }`;
        return isFilled ? (
          <StarHalfIcon className={className} key={i} />
        ) : (
          <StarIcon className={className} key={i} />
        );
      })}
    </div>
  );
};

export default Rating;
