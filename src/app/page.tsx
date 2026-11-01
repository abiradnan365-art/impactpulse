import { Banner } from "@/components/layout/banner";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <Banner />
      </main>
      <Footer />
    </>
  );
}
