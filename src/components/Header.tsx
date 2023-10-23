import { Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: "divider", marginBottom: 5 }}>
      <Typography
        component="h2"
        variant="h5"
        color="inherit"
        align="center"
        noWrap
        sx={{ flex: 1 }}
      >
        Trending repositories
      </Typography>
    </Toolbar>
  );
};
