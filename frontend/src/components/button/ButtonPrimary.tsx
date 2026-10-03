export function ButtonPrimary() {
  return (
    <button
      type="submit"
      className="group relative flex w-full cursor-pointer justify-center justify-self-end overflow-hidden rounded-lg p-2.5 shadow-lg sm:w-100"
    >
      <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) to-(--color-primary-soft)" />
      <span className="absolute inset-0 bg-linear-to-b from-(--color-primary) from-[-50%] to-(--color-primary-soft) opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      <span className="text-small relative"></span>
    </button>
  );
}
