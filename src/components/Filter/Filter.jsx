import { Input, FilterContainer, Text } from "./Filter.styled";
import { useSelector, useDispatch } from "react-redux";
import { getContacts, getFilter } from "redux/selectors";
import { setContactsFilter } from "redux/filterSlice";

function Filter ()  {
  const dispatch = useDispatch();

 const changeFilter = e => {
  dispatch(setContactsFilter(e.target.value));
  };
 
  const filter = useSelector(getFilter);
  const contactsSearch = useSelector(getContacts);
  return (
    <FilterContainer>
      <Text>Find contacts by name</Text>
      <Input
        type="text"
        name="filter"
        value={filter}
        onChange={changeFilter}
        placeholder="Name"
        disabled={contactsSearch.length === 0}
      />
    </FilterContainer>
  );
};

export default Filter;

