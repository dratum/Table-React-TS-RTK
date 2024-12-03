import { useState } from "react";
import { useAppDispatch } from "../../store";
import { deleteChecked, toggleAllChecked } from "../../slices/companiesSlices";

export const Buttons = ({
  setAddClicked,
  addClicked,
}: {
  addClicked: boolean;
  setAddClicked: (state: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const [allChecked, setAllChecked] = useState(false);

  const handleAllChecked = () => {
    setAllChecked((prev) => !prev);
    dispatch(toggleAllChecked(!allChecked));
  };

  const handleDelete = () => {
    dispatch(deleteChecked());
  };
  return (
    <>
      <button onClick={handleAllChecked}>
        {allChecked ? "Remove checked" : "Checked all"}
      </button>
      <button onClick={handleDelete}>Delete select</button>
      <button onClick={() => setAddClicked(!addClicked)}>
        {addClicked ? "Close" : "Add company"}
      </button>
    </>
  );
};
