import { trpc } from "@/sieve-web/app/trpc";
import { redirect } from "next/navigation";

export default async function Home() {
  // const { greeting } = await trpc.hello.query({ name: `Tom` });
  return redirect('/dashboard');
}
