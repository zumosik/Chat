import Image from "next/image";
import { FC } from "react";
import { Conversation } from "@prisma/client";

interface GroupAvatarProps {
  conversation: Conversation;
}

const GroupAvatar: FC<GroupAvatarProps> = ({ conversation }) => {
  return (
    <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
      <Image
        alt="group avatar"
        src={conversation?.GroupImage || "/images/group_placeholder.png"}
        fill
      />
    </div>
  );
};

export default GroupAvatar;
