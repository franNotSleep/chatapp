import Navbar from "./Navbar";

import { Box } from "@mui/material";
import UsersList from "./user/UsersList";

const Sidebar = () => {
	return (
		<Box>
			<Navbar />
			<UsersList />
		</Box>
	);
}

export default Sidebar;
