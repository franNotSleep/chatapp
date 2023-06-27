import Navbar from "./Navbar";

import { Box } from "@mui/material";
import UsersList from "./user/UsersList";

import Copyright from "./Copyright";

const Sidebar = () => {
	return (
		<Box 
			sx={{ 
				display: "flex", 
				flexFlow: "column", 
				height: "100%",
				background: "#C38154"
			}}>
			<Box sx={{ flex: "0 1 auto" }}>
				<Navbar />
			</Box>
			<Box sx={{ flex: "1 1 auto", height: "450px" }}>
				<UsersList />
			</Box>
			<Box sx={{ flex: "0 1 40px" }}>
				<Copyright />
			</Box>
		</Box>
	);
}

export default Sidebar;
