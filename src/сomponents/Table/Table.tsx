import "./styles.module.css";
import { useEffect, useState } from "react";
import { Buttons } from "../Buttons/Buttons";
import { companiesData } from "../../mockData/data";
import { useCompany } from "../../hooks/useCompany";
import { CompanyRow } from "../CompanyRow/CompanyRow";
import { getCompanies } from "../../slices/companiesSlices";

import { useAppDispatch, useAppSelector } from "../../store";

export const Table = () => {
  const dispatch = useAppDispatch();
  const [addClicked, setAddClicked] = useState(false);
  const companies = useAppSelector((state) => state.companies.companies);

  const { newCompany, handleNewCompanyChange, handleAddCompany } = useCompany();

  useEffect(() => {
    dispatch(getCompanies(companiesData));
  }, [dispatch]);

  return (
    <div>
      <Buttons addClicked={addClicked} setAddClicked={setAddClicked} />
      <table>
        <thead>
          <tr>
            <th scope='col'>Select</th>
            <th scope='col'>Label</th>
            <th scope='col'>Address</th>
          </tr>
        </thead>
        <tbody>
          {addClicked ? (
            <tr>
              <td>
                <button onClick={handleAddCompany}>Add in List</button>
              </td>
              <td>
                <input
                  name='title'
                  placeholder='enter label...'
                  type='text'
                  onChange={handleNewCompanyChange}
                  value={newCompany.title}
                />
              </td>
              <td>
                <input
                  onChange={handleNewCompanyChange}
                  name='address'
                  placeholder='enter address... '
                  type='text'
                  value={newCompany.address}
                />
              </td>
            </tr>
          ) : null}
          {companies.map((company) => {
            return <CompanyRow key={company.id} company={company} />;
          })}
        </tbody>
      </table>
    </div>
  );
};
