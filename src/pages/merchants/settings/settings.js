import Box from "@material-ui/core/Box";

import ChangePassword from "./components/ChangePassword";
import Profile from "./components/Profile";

function Settings() {
  return (
    <Box>
      <Profile />
      <ChangePassword />
    </Box>
  );
}

export default Settings;
