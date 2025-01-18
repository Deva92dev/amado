import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type FormPriceInputProps = {
  defaultValue?: number;
};

const PriceInput = ({ defaultValue }: FormPriceInputProps) => {
  const name = "price";
  return (
    <div className="mb-2">
      <Label htmlFor="price" className="capitalize">
        Price
      </Label>
      <Input
        id={name}
        name={name}
        type="number"
        min={0}
        defaultValue={defaultValue || 100}
        required
      />
    </div>
  );
};

export default PriceInput;
