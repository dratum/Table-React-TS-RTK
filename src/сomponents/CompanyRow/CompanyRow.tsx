import styles from "./styles.module.css";
import { CompanyType } from "../../mockData/data";
import { useCompanyRow } from "../../hooks/useEdit";

export const CompanyRow = ({ company }: { company: CompanyType }) => {
  const {
    editMode,
    editedValue,
    handleChecked,
    handleDoubleClick,
    handleInputChange,
    handleInputBlur,
    handleInputKeyPress,
  } = useCompanyRow();

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
