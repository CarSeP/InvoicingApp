import SidebarComponent from "@/components/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SidebarComponent />
      <main className="p-4">{children}</main>
    </div>
  );
}
