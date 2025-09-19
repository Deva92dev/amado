"use client";

import { useActionState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

type FormState = { message: string };

type StatefulAction = (
  prev: FormState,
  formData: FormData
) => Promise<FormState>;
type SimpleAction = (formData: FormData) => Promise<FormState>;

type FormContainerProps = {
  action: StatefulAction | SimpleAction; // accept both shapes
  children: React.ReactNode;
};

const initialState: FormState = { message: "" };

const FormContainer = ({ action, children }: FormContainerProps) => {
  const wrapped: StatefulAction = (prev, form) => {
    if (action.length === 1) {
      return (action as SimpleAction)(form);
    }
    return (action as StatefulAction)(prev, form);
  };

  const [state, formAction] = useActionState(wrapped, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.message) {
      toast({ description: state.message });
    }
  }, [state, toast]);

  return <form action={formAction}>{children}</form>;
};

export default FormContainer;
