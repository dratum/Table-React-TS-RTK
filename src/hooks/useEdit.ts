import { useState } from "react";
import { useAppDispatch } from "../store";
import { setChecked, updateCompany } from "../slices/companiesSlices";

export const useCompanyRow = () => {
  const dispatch = useAppDispatch();

  const [editMode, setEditMode] = useState<{
    [key: number]: { title?: boolean; address?: boolean };
  }>({});
  const [editedValue, setEditedValue] = useState<{
    [key: number]: { title?: string; address?: string };
  }>({});

  const handleChecked = (id: number) => {
    dispatch(setChecked(id));
  };

  const handleDoubleClick = (
    id: number,
    field: "title" | "address",
    value: string
  ) => {
    setEditMode({ ...editMode, [id]: { ...editMode[id], [field]: true } });
    setEditedValue({
      ...editedValue,
      [id]: { ...editedValue[id], [field]: value },
    });
  };

  const handleInputChange = (
    id: number,
    field: "title" | "address",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEditedValue({
      ...editedValue,
      [id]: { ...editedValue[id], [field]: event.target.value },
    });
  };

  const handleInputBlur = (id: number, field: "title" | "address") => {
    dispatch(updateCompany({ id, [field]: editedValue[id][field] }));
    setEditMode({ ...editMode, [id]: { ...editMode[id], [field]: false } });
  };

  const handleInputKeyPress = (
    id: number,
    field: "title" | "address",
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      handleInputBlur(id, field);
    }
  };

  return {
    editMode,
    editedValue,
    handleChecked,
    handleDoubleClick,
    handleInputChange,
    handleInputBlur,
    handleInputKeyPress,
  };
};
