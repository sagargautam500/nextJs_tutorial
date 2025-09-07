export default function ErrorMsg({ error }: { error: string }) {
  return (
    <p className="mt-1 text-sm text-red-600 font-medium animate-pulse">
      ⚠ {error}
    </p>
  );
}
