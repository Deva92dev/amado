export function Spinner() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
    </div>
  );
}
