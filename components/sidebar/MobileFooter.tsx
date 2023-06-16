"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import { FC, useState } from "react";
import MobileIcon from "./MobileItem";
import Avatar from "../Avatar";
import { User } from "@prisma/client";
import useActiveList from "@/hooks/useActiveList";
import { HiUser } from "react-icons/hi2";
import MobileUserModal from "./MobileUserModal";

interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter: FC<MobileFooterProps> = ({ currentUser }) => {
  const routes = useRoutes("MOBILE");
  const { isOpen } = useConversation();

  const { members } = useActiveList();
  const isActive = members.indexOf(currentUser?.email!) != -1;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isOpen) {
    return null;
  }

  return (
    <>
      <MobileUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currentUser={currentUser}
      />

      <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white border-t-[1px] lg:hidden">
        {routes.map((item) => {
          return (
            <MobileIcon
              key={item.label}
              href={item.href}
              icon={item.icon}
              active={item.active}
              onClick={item.onClick || undefined}
            />
          );
        })}

        <MobileIcon //cant be in hook becouse here is setIsModalOpen(true)
          href="#"
          icon={HiUser}
          active={false}
          onClick={() => setIsModalOpen(true)}
        />
      </div>
    </>
  );
};

export default MobileFooter;
