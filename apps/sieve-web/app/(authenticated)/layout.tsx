import SieveNavbar from "./navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen bg-bubblegum">
      <SieveNavbar></SieveNavbar>
      <section>{children}</section>
    </div>
  );
}
