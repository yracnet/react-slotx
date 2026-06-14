import { Outlet } from "react-slotx";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* The page title registered anywhere in the tree will render here */}
      <header>
        <Outlet name="page-title" />
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}