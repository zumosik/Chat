import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import Body from "@/components/conversations/Body";
import Header from "@/components/conversations/Header";
import { redirect } from 'next/navigation';


interface IParams {
  conversationId: string;
}

const Page = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);
  

  if (!conversation) redirect("/conversations")

  return (
    <div className="lg:pl-80 h-full">
      <div className="h-full flex flex-col">
        <Header conversation={conversation} />
        <Body initialMessages={messages} />
      </div>
    </div>
  );
};

export default Page;
