import Navbar from "@/components/marketing/Navbar";
import Footer from "@/components/marketing/Footer";
import FloatingWhatsApp from "@/components/marketing/FloatingWhatsApp";
import SolforbsChatbot from "@/components/marketing/SolforbsChatbot";
import { getProjects } from "@/lib/actions/project.actions";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const projects = await getProjects();

  return (
    <>
      <Navbar projects={projects} />
      <main style={{ flex: 1 }}>
        {children}
      </main>
      <Footer />
      <SolforbsChatbot />
      <FloatingWhatsApp />
    </>
  );
}
