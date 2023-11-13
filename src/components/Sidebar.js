import {
	Add,
	ExitToApp,
	Home,
	Message,
	PeopleAlt,
	SearchOutlined,
} from "@mui/icons-material";
import {
	Avatar,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	TextField,
} from "@mui/material";
import React, { useState } from "react";
import SidebarTab from "./SidebarTab";
import SidebarList from "./SidebarList";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/utils/firebase";
import { useRouter } from "next/router";
import useRooms from "@/hooks/useRooms";

const tabs = [
	{ id: 1, icon: <Home /> },
	{ id: 2, icon: <Message /> },
	{ id: 3, icon: <PeopleAlt /> },
];

function Sidebar({ user }) {
	const router = useRouter()
	const [menu, setMenu] = useState(1);
	const [roomName, setRoomName] = useState('')
	const [isCreatingRoomDialogOpen, setIsCreatingRoomDialogOpen] =
		useState(false);
	const data = [{ id: 1, name: "John Doe", photoURL: null }];

	const rooms = useRooms()

	async function createRoom (){
		if(roomName?.trim()){
			const roomRef = collection(db, 'rooms')
			const newRoom = await addDoc(roomRef, {
				name: roomName,
				timestamp: serverTimestamp()
			})
			setIsCreatingRoomDialogOpen(false)
			setMenu(2)
			setRoomName('')
			router.push(`/?roomId=${newRoom.id}`)
		}
	}

	return (
		<div className="sidebar">
			{/* Header */}
			<div className="sidebar__header">
				<div className="sidebar__header--left">
					<Avatar src={user?.photoURL} alt={user?.displayName} />
					<h4>{user?.displayName}</h4>
				</div>
				<div className="sidebar__header--right">
					<IconButton onClick={() => auth.signOut()}>
						<ExitToApp />
					</IconButton>
				</div>
			</div>

			{/* Search */}
			<div className="sidebar__search">
				<form className="sidebar__search--container">
					<SearchOutlined />
					<input
						type="text"
						id="search"
						placeholder="Search for user or rooms"
					/>
				</form>
			</div>

			{/* Tabs */}
			<div className="sidebar__menu">
				{tabs.map((tab) => (
					<SidebarTab
						key={tab.id}
						onClick={() => setMenu(tab.id)}
						isActive={tab.id === menu}
					>
						<div className="sidebar__menu--home">
							{tab.icon}
							<div className="sidebar__menu--line" />
						</div>
					</SidebarTab>
				))}
			</div>

			{menu === 1 ? (
				<SidebarList title="Chats" data={data} />
			) : menu == 2 ? (
				<SidebarList title="Rooms" data={rooms} />
			) : menu == 3 ? (
				<SidebarList title="Users" data={data} />
			) : menu === 4 ? (
				<SidebarList title="Search Result" data={data} />
			) : null}

			{/* Create Room Button */}
			<div className="sidebar__chat--addRoom">
				<IconButton onClick={() => setIsCreatingRoomDialogOpen(true)}>
					<Add />
				</IconButton>
			</div>

			{/* Create Room Dialog */}
			<Dialog
				open={isCreatingRoomDialogOpen}
				maxWidth="sm"
				onClose={() => setIsCreatingRoomDialogOpen(false)}
			>
				<DialogTitle>Subscribe</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Type the name of your public room. Every user will be able to join
						this room
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="roomName"
						label="Room Name"
						type="text"
						fullWidth
						variant="filled"
						style={{ marginTop: 20 }}
						onChange={e => setRoomName(e.target.value)}
						value={roomName}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						color="error"
						onClick={() => setIsCreatingRoomDialogOpen(false)}
					>
						Cancel
					</Button>
					<Button color="success" onClick={createRoom}>Submit</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Sidebar;
