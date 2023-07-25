export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <h1 className="text-3xl mt-4 text-primary">Docs Layout</h1>
        {children}
      </div>
    </div>
  );
}
