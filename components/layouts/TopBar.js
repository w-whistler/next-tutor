import { AppBar, Badge, Box, Toolbar, Typography } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";

export default function TopBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box flex flexDirection="row">
          <Typography variant="h5">
            Store
          </Typography>
          <Badge badgeContent={3} color="secondary">
            <ShoppingCartOutlined />
          </Badge>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
