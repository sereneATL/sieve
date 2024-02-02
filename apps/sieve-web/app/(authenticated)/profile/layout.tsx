import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense
      fallback={
        <>
          <div className="flex flex-col gap-1 items-center justify-center w-full">
            <Spinner />
          </div>
        </>
      }
    >
      {children}
    </Suspense>
  );
}
