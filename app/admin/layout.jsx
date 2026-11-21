export const metadata = {
  title: "Admin · El Maxhi",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <div className="min-h-dvh bg-cream text-ink">{children}</div>;
}
