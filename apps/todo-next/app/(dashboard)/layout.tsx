import NewTodoForm from '@/components/NewTodoForm';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>
        <h1 className="text-4xl mt-4 ml-2 text-primary">Todos Layout</h1>
      </div>
      <div>
        <NewTodoForm />
      </div>
      <div>{children}</div>
    </div>
  );
}
