import { Input, FilterContainer, Text } from "./Filter.styled";
import { useSelector, useDispatch } from "react-redux";
import { selectContacts, selectFilter } from "redux/selectors";
import { setContactsFilter } from "redux/filterSlice";

function Filter ()  {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

 const changeFilter = e => {
  dispatch(setContactsFilter(e.target.value.trim()));
  };
 

  return (
    <FilterContainer>
      <Text>Find contacts by name</Text>
      <Input
        type="text"
        name="filter"
        value={filter}
        onChange={changeFilter}
        placeholder="Name"
        disabled={selectContacts.length === 0}
      />
    </FilterContainer>
  );
};

export default Filter;

