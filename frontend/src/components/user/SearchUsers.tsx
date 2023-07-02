import { useContext } from "react";

import { OutlinedInput, IconButton, InputAdornment } from "@mui/material";
import { axiosService } from "../../helper/axios";

import SearchIcon from "@mui/icons-material/Search";

import { User } from "../../contexts/userContext";

import { UserContext } from "../../contexts/userContext";


const SearchUsers = () => {
  const { setUsers } = useContext(UserContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    axiosService
      .get(`/users?search=${e.target.value}`)
      .then(({ data }: { data: { users: User[] } }) => {
        setUsers(data.users);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
      <OutlinedInput
        sx={{ borderRadius: "10px", height: "40px", marginX: 2 }}
        placeholder="Search"
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton color="info" type="submit">
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
  );
}

export default SearchUsers;
