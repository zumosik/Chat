import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { HiChat } from "react-icons/hi";
import { HiArrowLeftOnRectangle, HiUsers, HiQuestionMarkCircle } from "react-icons/hi2";
import { signOut } from "next-auth/react";
import useConversation from "./useConversation";

type mobileOrDesktop = "MOBILE" | "DESKTOP";

const useRoutes = (mobileOrDesktop: mobileOrDesktop) => {
  const pathname = usePathname();
  const { conversationId } = useConversation();

  if (mobileOrDesktop == "DESKTOP") {
    const routes = useMemo(
      () => [
        {
          label: "Chat",
          href: "/conversations",
          icon: HiChat,
          active: pathname === "/conversations" || !!conversationId,
          onClick: null,
        },
        {
          label: "Users",
          href: "/users",
          icon: HiUsers,
          active: pathname === "/users",
          onClick: null,
        },
        {
          label: "Help",
          href: "/help",
          icon: HiQuestionMarkCircle,
          active: pathname === "/help",
          onClick: null,
        },
        {
          label: "Logout",
          onClick: () => signOut({ callbackUrl: "/" }),
          href: "#",
          icon: HiArrowLeftOnRectangle,
        },
      ],
      [pathname, conversationId]
    );

    return routes;
  } else {
    const routes = useMemo(
      () => [
        {
          label: "Chat",
          href: "/conversations",
          icon: HiChat,
          active: pathname === "/conversations" || !!conversationId,
          onClick: null,
        },
        {
          label: "Users",
          href: "/users",
          icon: HiUsers,
          active: pathname === "/users",
          onClick: null,
        },
      ],
      [pathname, conversationId]
    );

    return routes;
  }
};

export default useRoutes;
