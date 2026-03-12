export function LoginImage({ src, alt }) {
  return (
    <div className="hidden md:block md:w-1/2">
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}
