/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useToast } from "@/hooks/use-toast";
import { useActionState, useEffect } from "react";

const initialState = {
  message: "",
};

type FormContainerProps = {
  action: (prevState: any, formData: FormData) => Promise<{ message: string }>;
  children: React.ReactNode;
};

const FormContainer = ({ action, children }: FormContainerProps) => {
  const [state, formAction] = useActionState(action, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({ description: state.message });
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
