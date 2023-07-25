export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <h1 className="text-4xl mt-4 text-primary">Todos Layout</h1>
      </div>
      <div>{/*  */}</div>
      <div>{children}</div>
    </div>
  );
}
