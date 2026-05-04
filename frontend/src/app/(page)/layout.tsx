import Navbar from "../../components/Navbar/Navbar"; // تأكد من صحة المسار
import PublicChrome from "../../components/PublicChrome/PublicChrome";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* الـ main هنا عشان يضمن إن المحتوى واخد مساحة بين النافبار والفوتر */}
      <main className="grow pt-10"> 
        {children}
      </main>
      <PublicChrome />
    </div>
  );
}