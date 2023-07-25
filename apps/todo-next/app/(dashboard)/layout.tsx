export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <h1 className="text-3xl mt-4">Todos</h1>
      </div>
      <div>{/*  */}</div>
      <div>{children}</div>
    </div>
  );
}
