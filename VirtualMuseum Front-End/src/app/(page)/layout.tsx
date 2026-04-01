import Navbar from "../../components/Navbar/Navbar"; // تأكد من صحة المسار
import Footer from "../../components/Footer/Footer"; // تأكد من صحة المسار
import FloatingButtons from "../../components/FloatingButtons/FloatingButtons"; // التعديل هنا (زودنا حرف S)

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* الـ main هنا عشان يضمن إن المحتوى واخد مساحة بين النافبار والفوتر */}
      <main className="flex-grow pt-10"> 
        {children}
      </main>
      <Footer />
      
      {/* المربعين العائمين */}
      <FloatingButtons /> 
    </div>
  );
}