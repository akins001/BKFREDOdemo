import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import ScrollProgress from "./ScrollProgress";
import ScrollToTop from "./ScrollToTop";
import AppLoader from "./AppLoader";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col p-1 md:p-1.5 bg-background">
    <AppLoader />
    <ScrollToTop />
    <ScrollProgress />
    <Navbar />
    <main className="flex-1 pt-16 md:pt-20">{children}</main>
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Layout;
