"use client";

import { memo } from "react";
import ImageActions from "./ImageActions";

type ImageActionsProps = {
  productId: string;
  favoriteId: string | null;
  productHref: string;
};

export const MemoImageActions = memo(function MemoImageActions(
  props: ImageActionsProps
) {
  return <ImageActions {...props} />;
});
