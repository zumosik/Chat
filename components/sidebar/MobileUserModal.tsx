"use client";

import useConversation from "@/hooks/useConversation";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import Modal from "../Modals/Modal";
import { IoAlert, IoHelpOutline } from "react-icons/io5";
import { Dialog } from "@headlessui/react";
import Button from "@/components/Button";
import { CiSettings } from "react-icons/ci";
import { BiLogOut } from "react-icons/bi";
import { signOut } from "next-auth/react";
import SettingsModal from "./SettingsModal";
import { User } from "@prisma/client";

interface ConfirmModalProps {
  isOpen?: boolean;
  onClose: () => void;
  currentUser: User;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
  onClose,
  isOpen,
  currentUser,
}) => {
  const router = useRouter();
  const { conversationId } = useConversation();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <Modal onClose={onClose} isOpen={isOpen}>
        <div className="sm:flex sm:items-center">
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <Dialog.Title
              as="h3"
              className="text-base font-semibold leading-6 text-gray-900"
            >
              Choose action
            </Dialog.Title>
          </div>
        </div>

        <div className="mt-5 sm:mt-4 flex justify-center items-center flex-wrap gap-4">
          <Button
            secondary
            disabled={isLoading}
            onClick={() => {
              router.push("/help")
            }}
          >
            <div className=" flex justify-center items-center gap-1">
              <IoHelpOutline className="w-6 h-6" />
              Help
            </div>
          </Button>
          <Button
            secondary
            disabled={isLoading}
            onClick={() => {
              setIsModalOpen(true);
              onClose();
            }}
          >
            <div className=" flex justify-center items-center gap-1">
              <CiSettings className="w-6 h-6" />
              Settings
            </div>
          </Button>
          <Button
            danger
            disabled={isLoading}
            onClick={() => {
              setIsLoading(true);
              signOut()
                .catch(() => {
                  toast.error("Something went wrong!");
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }}
          >
            <div className="flex justify-center items-center gap-1">
              <BiLogOut className="w-6 h-6" />
              Sign out
            </div>
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmModal;
