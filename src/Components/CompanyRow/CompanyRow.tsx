import { CompanyType } from "../../data/data";
import styles from "./styles.module.css";
import { useAppDispatch } from "../../store";
import { setChecked, updateCompany } from "../../slices/companiesSlices";
import { useState } from "react";

export const CompanyRow = ({ company }: { company: CompanyType }) => {
  const [editMode, setEditMode] = useState<{
    [key: number]: { title?: boolean; address?: boolean };
  }>({});
  const [editedValue, setEditedValue] = useState<{
    [key: number]: { title?: string; address?: string };
  }>({});

  const dispatch = useAppDispatch();
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

  return (
    <tr
      key={company.id}
      className={company.checked ? styles.grey : styles.none}
    >
      <td>
        <input
          type='checkbox'
          checked={company.checked}
          onChange={() => handleChecked(company.id)}
        />
      </td>

      {editMode[company.id]?.title ? (
        <td>
          <input
            className={styles["edit-input"]}
            type='text'
            value={editedValue[company.id].title}
            onChange={(e) => handleInputChange(company.id, "title", e)}
            onBlur={() => handleInputBlur(company.id, "title")}
            onKeyDown={(e) => handleInputKeyPress(company.id, "title", e)}
            autoFocus
          />
        </td>
      ) : (
        <td
          onDoubleClick={() =>
            handleDoubleClick(company.id, "title", company.title)
          }
        >
          {company.title}
        </td>
      )}

      {editMode[company.id]?.address ? (
        <td>
          <input
            className={styles["edit-input"]}
            type='text'
            value={editedValue[company.id].address}
            onChange={(e) => handleInputChange(company.id, "address", e)}
            onBlur={() => handleInputBlur(company.id, "address")}
            onKeyDown={(e) => handleInputKeyPress(company.id, "address", e)}
            autoFocus
          />
        </td>
      ) : (
        <td
          onDoubleClick={() =>
            handleDoubleClick(company.id, "address", company.address)
          }
        >
          {company.address}
        </td>
      )}
    </tr>
  );
};
