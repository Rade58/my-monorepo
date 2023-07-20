import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: LayoutProps) {
  const links = [
    { name: "Home", href: "/" },
    { name: "Journal", href: "/journal" },
    { name: "History", href: "/history" },
  ];

  return (
    <div className="border-0 border-primary h-screen w-screen relative overflow-x-hidden">
      <aside className="absolute w-56 top-0 left-0 h-full border-r border-secondary/75">
        {/* @ts-expect-error RSC */}
        <Link href="/">Feelings</Link>
        <div className="h-6"></div>
        <ul className="menu bg-base-100 w-52 mt-5">
          {links.map(({ href, name }) => {
            return (
              <li key={href}>
                {/* @ts-expect-error RSC */}
                <Link href={href}>{name}</Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <div className="ml-56 h-full">
        <header className="relative h-[60px] border-b border-secondary/75">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
}
