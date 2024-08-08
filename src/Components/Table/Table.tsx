import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { companiesData } from "../../data-companies/data";
import {
  getCompanies,
  toggleAllChecked,
  deleteChecked,
  addCompany,
} from "../../slices/companiesSlices";
import { CompanyRow } from "../CompanyRow/CompanyRow";

export const Table = () => {
  const dispatch = useAppDispatch();
  const companies = useAppSelector((state) => state.companies.companies);
  const [allChecked, setAllChecked] = useState(false);
  const [addClicked, setAddClicked] = useState(false);
  const [newCompany, setNewCompany] = useState<{
    title: string;
    address: string;
  }>({ title: "", address: "" });

  const handleAllChecked = () => {
    setAllChecked(!allChecked);
    dispatch(toggleAllChecked(!allChecked));
  };

  const handleDelete = () => {
    dispatch(deleteChecked());
  };

  const handleNewCompanyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
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
      setAddClicked(false);
    }
  };

  useEffect(() => {
    dispatch(getCompanies(companiesData));
  }, [dispatch]);

  return (
    <div>
      <button onClick={handleAllChecked}>
        {allChecked ? "Снять выделение" : "Выделить все"}
      </button>

      <button onClick={handleDelete}>Удалить выбранное</button>

      <button onClick={() => setAddClicked(!addClicked)}>
        {addClicked ? "Закрыть" : "Добавить компанию"}
      </button>

      <table>
        <thead>
          <tr>
            <th scope='col'>Выбрать</th>
            <th scope='col'>Название компании</th>
            <th scope='col'>Адрес</th>
          </tr>
        </thead>
        <tbody>
          {addClicked ? (
            <tr>
              <td>
                <button onClick={handleAddCompany}>Добавить в список</button>
              </td>
              <td>
                <input
                  name='title'
                  placeholder='введите название'
                  type='text'
                  onChange={handleNewCompanyChange}
                  value={newCompany.title}
                />
              </td>
              <td>
                <input
                  onChange={handleNewCompanyChange}
                  name='address'
                  placeholder='введите адрес'
                  type='text'
                  value={newCompany.address}
                />
              </td>
            </tr>
          ) : (
            <></>
          )}
          {companies.map((company) => {
            return <CompanyRow company={company} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
