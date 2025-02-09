"use client";

import { toggleFavoriteAction } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { CardSubmitButton } from "../form/Buttons";
import { useState, useTransition } from "react";

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
  const [, startTransition] = useTransition();

  const action = async (_prevState: any): Promise<{ message: string }> => {
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
      // Rollback on error
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
