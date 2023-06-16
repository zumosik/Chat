import EmptyState from "@/components/EmptyState";
import { FC } from "react";

interface pageProps {}

const Page: FC<pageProps> = ({}) => {
  return (
    <div className="hidden lg:block lg:pl-80 h-full">
      <EmptyState />
    </div>
  );
};

export default Page;
