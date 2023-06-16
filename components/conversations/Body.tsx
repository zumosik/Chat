"use client";

import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import { FC, useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";
import { pusherClient } from "@/lib/pusher";
import { find } from "lodash";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CldUploadButton } from "next-cloudinary";
import { HiPaperAirplane, HiPhoto } from "react-icons/hi2";
import MessageInput from "@/components/inputs/MessageInput";

interface BodyProps {
  initialMessages: FullMessageType[];
}

const Body: FC<BodyProps> = ({ initialMessages }) => {
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current) => {
        if (find(current, { id: message.id })) return current;
        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current) =>
        current.map((msg) => {
          if (msg.id === newMessage.id) return newMessage;
          return msg;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler); //get from api route
    pusherClient.bind("messages:update", updateMessageHandler);

    return () => {
      pusherClient.unsubscribe(conversationId); //delete subscription and binding
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("messages:update", updateMessageHandler);
    };
  }, [conversationId]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      msg: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    bottomRef?.current?.scrollIntoView();
    setValue("msg", "", { shouldValidate: true });
    axios.post("/api/messages", { message: data.msg, conversationId });
  };

  const handleUpload = (result: any) => {
    axios.post("/api/messages", {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {messages.map((message, i) => (
          <MessageBox
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
          />
        ))}
        <div className="pt-24" ref={bottomRef} /> {/* to scroll down*/}
      </div>

      {/* MSG INPUT  */}
      <div className="p-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
        <CldUploadButton
          options={{ maxFiles: 1 }}
          onUpload={handleUpload}
          uploadPreset="ib2us7jf"
        >
          <HiPhoto size={30} className="text-sky-500" />
        </CldUploadButton>
        <form
          onSubmit={handleSubmit(onSubmit) /* yeah */}
          className="flex items-center gap-2 lg:gap-4 w-full"
        >
          <MessageInput
            id="msg"
            register={register}
            errors={errors}
            required
            placeholder="Message here..."
          />
          <button
            type="submit"
            className="rounded-full p-2 bg-sky-500 cursor-pointer hover:bg-sky-600 transition"
          >
            <HiPaperAirplane size={18} className="text-white" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Body;
