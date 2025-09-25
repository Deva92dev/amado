"use client";

import { useEffect, useRef, useTransition, useState } from "react";
import { toggleFavoriteAction } from "@/utils/actions";
import FormContainer from "../form/FormContainer";
import { CardSubmitButton } from "../form/Buttons";

type FormState = { message: string };
type FavoriteToggleFormProps = { favoriteId: string | null; productId: string };

export default function FavoriteToggleForm({
  favoriteId: initialFavoriteId,
  productId,
}: FavoriteToggleFormProps) {
  const [optimisticFavoriteId, setOptimisticFavoriteId] = useState<
    string | null
  >(initialFavoriteId);
  const [isPending, startTransition] = useTransition();
  const lastStableId = useRef(initialFavoriteId);

  useEffect(() => {
    if (initialFavoriteId !== lastStableId.current) {
      lastStableId.current = initialFavoriteId;
      setOptimisticFavoriteId(initialFavoriteId);
    }
  }, [initialFavoriteId]);

  const action = async (_prev: FormState | undefined): Promise<FormState> => {
    const baseline = optimisticFavoriteId;
    setOptimisticFavoriteId(baseline ? null : "optimistic-id");

    startTransition(async () => {
      try {
        const result = await toggleFavoriteAction({
          productId,
          favoriteId: baseline,
        });
        lastStableId.current = result.favoriteId || null;
        setOptimisticFavoriteId(result.favoriteId || null);
      } catch {
        setOptimisticFavoriteId(baseline);
      }
    });

    return { message: "queued" };
  };

  return (
    <FormContainer action={action}>
      <CardSubmitButton isFavorite={!!optimisticFavoriteId} />
    </FormContainer>
  );
}
