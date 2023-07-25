export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <h1 className="text-2xl mt-4">docs</h1>
        {children}
      </div>
    </div>
  );
}
