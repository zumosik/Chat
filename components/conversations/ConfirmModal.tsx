"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modals/Modal";
import { IoAlert } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import Button from '@/components/Button';

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ onClose, isOpen }) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = useCallback(() => {
    setIsLoading(true);

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        onClose();
        router.push("/conversations");
        router.refresh();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => {
        setIsLoading(false);
      });
  }, [conversationId, router, onClose]);

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="sm:flex sm:items-center">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 justify-center items-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <IoAlert className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-600">
              Are you certain about your intention to delete this conversation?
              This action is cannot be undone and will impact other user
              conversation.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button danger disabled={isLoading} onClick={onDelete}>Delete</Button>
        <Button secondary disabled={isLoading} onClick={onClose}>Cancel</Button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
