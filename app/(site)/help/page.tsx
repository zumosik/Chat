"use client";

import { FC, useState } from "react";
import Input from "@/components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Button from '@/components/Button';
import Link from 'next/link';

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {};

  return (
    <div className="p-10">
      <h1 className="text-3xl">Here will be some help</h1>
      <h2 className="text-lg text-gray-500">(later)</h2>
      <Link href="/conversations" className="underline text-xl text-sky-700">Go back to home</Link>
    </div>
  );
};

export default page;
