import { UserButton } from "@clerk/nextjs";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  return (
    <div className="border-0 border-primary h-screen w-screen relative">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-primary/75">
        Feelings
      </aside>
      <div className="ml-[200px]">
        <header className="relative h-[60px] border-b border-primary/75">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div>{children}</div>
      </div>
    </div>
  );
}
