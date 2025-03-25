import SidebarComponent from "@/components/Sidebar";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <SidebarComponent />
      <main className="flex justify-center w-full p-4 pt-10">
        <div className="max-w-5xl w-full">{children}</div>
      </main>
    </div>
  );
}
