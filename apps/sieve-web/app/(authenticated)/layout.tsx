import SieveNavbar from "./navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-bubblegum overflow">
      <SieveNavbar></SieveNavbar>
      <div className="xl:m-16 sm:m-10 mt-6 flex items-center">
        <div className="bg-mono-light-100 sm:rounded-xl w-full md:p-20 p-4 overflow">
          <section className="flex flex-col items-center">{children}</section>
        </div>
      </div>
    </div>
  );
}
