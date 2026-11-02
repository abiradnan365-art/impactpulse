import { Banner } from "@/components/layout/banner";
import { Features } from "@/components/layout/features";

import { Newsletter } from "@/components/layout/newsletter";

export default function Home() {
  return (
    <>
     
      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <Banner />
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <Features />
        </div>
      </main>
      <Newsletter />
   
    </>
  );
}
