"use client";

import { toggleFavoriteAction } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { CardSubmitButton } from "../form/Buttons";
import { useState, useTransition } from "react";

type FormState = {
  message: string;
};

type FavoriteToggleFormProps = {
  favoriteId: string | null;
  productId: string;
};

const FavoriteToggleForm = ({
  favoriteId: initialFavoriteId,
  productId,
}: FavoriteToggleFormProps) => {
  const [optimisticFavoriteId, setOptimisticFavoriteId] =
    useState(initialFavoriteId);
  const startTransition = useTransition()[1];

  const action = async (
    _prevState: FormState | undefined
  ): Promise<{ message: string }> => {
    const currentFavoriteId = optimisticFavoriteId;

    // Optimistic update
    startTransition(() => {
      setOptimisticFavoriteId(currentFavoriteId ? null : "optimistic-id");
    });

    try {
      const result = await toggleFavoriteAction({
        productId,
        favoriteId: currentFavoriteId,
        pathname: window.location.pathname,
      });

      // Sync with actual result
      setOptimisticFavoriteId(result.favoriteId || null);
      return { message: result.message };
    } catch (error) {
      setOptimisticFavoriteId(initialFavoriteId);
      return { message: "Failed to update favorite" };
    }
  };

  return (
    <FormContainer action={action}>
      <CardSubmitButton isFavorite={!!optimisticFavoriteId} />
    </FormContainer>
  );
};

export default FavoriteToggleForm;
