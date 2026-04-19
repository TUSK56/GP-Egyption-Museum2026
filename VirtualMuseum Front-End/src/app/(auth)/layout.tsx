export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="antialiased">
      {children}
    </section>
  );
}
