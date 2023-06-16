"use client";

import { User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "../Modals/Modal";
import Input from "@/components/inputs/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "@/components/Button";

interface SettingsModalProps {
  currentUser: User;
  isOpen?: boolean;
  onClose: () => void;
}

const SettingsModal: FC<SettingsModalProps> = ({
  currentUser,
  onClose,
  isOpen,
}) => {
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
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");
  const handleUpload = (result: any) => {
    setValue("image", result?.info?.secure_url, {
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="pb-6">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit your public info.
            </p>

            <div className="mt-4 flex flex-col gap-6">
              <div>

                <div className="mt-2 flex items-center gapx-3">
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="ib2us7jf"
                  >
                    {/* <Button disabled={isLoading} secondary type="button">
                      Change
                    </Button> */}

                    <Image
                      width={128}
                      height={128}
                      className="rounded-full hover:opacity-75 outline outline-gray-500"
                      src={
                        image || currentUser?.image || "/images/placeholder.jpg"
                      }
                      alt="Avatar"
                    />
                  </CldUploadButton>
                </div>
              </div>

              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                required
                register={register}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-5">
            <Button disabled={isLoading} onClick={onClose} secondary>
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
