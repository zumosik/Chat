import getCurrentUser from "@/actions/getCurrentUser";
import DesktopSidebar from "@/components/sidebar/DesktopSidebar";
import MobileFooter from "@/components/sidebar/MobileFooter";

const Sidebar = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  return (
    <div className="h-full">
      <DesktopSidebar currentUser={user!} />
      <MobileFooter currentUser={user!} />

      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
};

export default Sidebar;
