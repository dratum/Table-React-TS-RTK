import { useAppDispatch } from "../store";
import { useState, ChangeEvent } from "react";
import { addCompany } from "../slices/companiesSlices";

export const useCompany = () => {
  const dispatch = useAppDispatch();
  const [newCompany, setNewCompany] = useState<{
    title: string;
    address: string;
  }>({ title: "", address: "" });

  const handleNewCompanyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCompany({ ...newCompany, [name]: value });
  };

  const handleAddCompany = () => {
    if (newCompany.title && newCompany.address) {
      const newId = Date.now();
      dispatch(
        addCompany({
          id: newId,
          title: newCompany.title,
          address: newCompany.address,
          checked: false,
        })
      );
      setNewCompany({ title: "", address: "" });
    }
  };

  return { newCompany, handleNewCompanyChange, handleAddCompany };
};
