import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Badge, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom"; 

export default function MenuAppBar() {
  const [auth] = React.useState(true); 
  const [anchorEl, setAnchorEl] = React.useState(null); 
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState([
    { id: 1, text: "New user signed up", read: false },
    { id: 2, text: "Server update completed", read: false },
    { id: 3, text: "Password change detected", read: false },
  ]);

  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenu = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleMarkAsRead = (notificationId) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const handleProfileClick = () => {
    navigate("/profile"); 
  };

  const handleAccountClick = () => {
    navigate("/account-settings"); 
  };

  const unreadNotificationsCount = notifications.filter((notification) => !notification.read).length;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#434e5c" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Dashboard
          </Typography>
          {auth && (
            <div>
              
              <IconButton
                color="inherit"
                onClick={handleNotificationMenu}
              >
                <Badge badgeContent={unreadNotificationsCount} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Menu
                id="notification-menu"
                anchorEl={notificationAnchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(notificationAnchorEl)}
                onClose={handleNotificationClose}
              >
                <Box sx={{ width: 300 }}>
                  <Typography variant="h6" sx={{ padding: "8px 16px" }}>
                    Notifications
                  </Typography>
                  <Divider />
                  <List>
                    {notifications.map((notification) => (
                      <ListItem
                        key={notification.id}
                        button
                        onClick={() => handleMarkAsRead(notification.id)}
                        sx={{ backgroundColor: notification.read ? "transparent" : "#f0f0f0" }}
                      >
                        <ListItemText primary={notification.text} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Menu>

           
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>

           
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
                <MenuItem onClick={handleAccountClick}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
