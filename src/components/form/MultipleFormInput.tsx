"use client";

import { useState } from "react";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import { Input } from "../ui/input";

type MultipleFormInputType = {
  name: string;
  type: string;
  label?: string;
  placeholder?: string;
  defaultValue?: string[];
};

const MultipleFormInput = ({
  name,
  type,
  defaultValue = [],
  label,
  placeholder,
}: MultipleFormInputType) => {
  const [values, setValues] = useState<string[]>(defaultValue);
  const [inputValue, setInputValue] = useState<string>("");

  const handleAddCategory = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim()) {
      event.preventDefault();
      // cause category is an array of strings
      const newCategory = inputValue.trim();
      if (!values.includes(newCategory)) {
        setValues((prevValues) => [...prevValues, newCategory]);
      }
      setInputValue("");
    }
  };

  const handleRemoveCategory = (index: number) => {
    const removeValues = values.filter((_, i) => i !== index);
    setValues(removeValues);
  };

  const serializedValues = JSON.stringify(values);

  return (
    <div className="mb-2">
      <Label className="capitalize">{label || name}</Label>
      <div className="flex flex-wrap gap-2">
        <Input
          id={name}
          name={name}
          type={type}
          value={inputValue}
          placeholder={placeholder || "Add a category and press enter"}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddCategory}
        />
        {values.map((value, index) => (
          <div
            key={index}
            className="flex items-center bg-muted px-2 py-1 rounded-full"
          >
            <span className="text-sm mr-2">{value}</span>
            <button
              type="button"
              onClick={() => handleRemoveCategory(index)}
              className="text-red-500 hover:text-red-700"
            >
              <X />
            </button>
          </div>
        ))}
      </div>
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={serializedValues} />
    </div>
  );
};

export default MultipleFormInput;
