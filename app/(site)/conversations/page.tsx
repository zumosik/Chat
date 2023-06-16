"use client";

import clsx from "clsx";
import useConversation from "@/hooks/useConversation";
import { FC } from "react";
import EmptyState from "@/components/EmptyState";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  const { isOpen } = useConversation();
  return (
    <div
      className={clsx("lg:pl-80 h-full lg:block", isOpen ? "block" : "hidden")}
    >
      <EmptyState />
    </div>
  );
};

export default Page;
