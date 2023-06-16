"use client";

import { FC, useState } from "react";
import Modal from "../Modals/Modal";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "@/components/inputs/Input";
import Select from "../inputs/Select";
import Button from "@/components/Button";
import { CldUploadButton } from "next-cloudinary";
import Image from "next/image";

interface NewGroupModalProps {
  isOpen?: boolean;
  onClose: () => void;
  users: User[];
}

const NewGroupModal: FC<NewGroupModalProps> = ({ onClose, isOpen, users }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
      image: "",
    },
  });

  const members = watch("members");
  const image = watch("image");

  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { ...data, isGroup: true })
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong!"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-2">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat
            </h2>

            <div className="mt-10 flex flex-col gap-y-8 ">
              <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="ib2us7jf"
              >
                <Image
                  width={128}
                  height={128}
                  className="rounded-full hover:opacity-75 outline outline-gray-500"
                  src={image || "/images/group_placeholder.png"}
                  alt="Group Avatar"
                />
              </CldUploadButton>
              <Input
                errors={errors}
                id="name"
                label="Name"
                register={register}
                disabled={isLoading}
                required
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(val) =>
                  setValue("members", val, {
                    shouldValidate: true,
                  })
                }
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Button
            secondary
            onClick={onClose}
            disabled={isLoading}
            type="button"
          >
            Cancel
          </Button>
          <Button disabled={isLoading} type="submit">
            Create
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default NewGroupModal;
