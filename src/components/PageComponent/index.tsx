import { ReactNode, useState } from "react";
import {
  Drawer,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  ListItemText,
  List,
  Divider,
  ListItem,
  Box,
} from "@material-ui/core";
import { MenuOutlined } from "@material-ui/icons";
import { getMenus } from "../../services/service";
import { useHistory } from "react-router-dom";

type PageComponentProps = {
  children?: ReactNode;
  title: string;
};
type AnchorType = "top" | "left" | "bottom" | "right";

export function PageComponent(props: PageComponentProps) {
  const menus = getMenus();

  const history = useHistory();
  const [menuState, setMenuState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: AnchorType, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setMenuState({ ...menuState, [anchor]: open });
    };

  const list = (anchor: AnchorType) => (
    <Box
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List
        style={{
          width: 250,
        }}
      >
        {menus.map((menu, _index) => (
          <>
            <ListItem key={menu.path}>
              <ListItemText
                primary={menu.title}
                onClick={() => history.push(menu.path)}
              />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="page">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Button onClick={toggleDrawer("left", true)}>
              <MenuOutlined color="inherit" />
            </Button>
            <Drawer
              anchor={"left"}
              open={menuState["left"]}
              onClose={toggleDrawer("left", false)}
            >
              {list("left")}
            </Drawer>
          </IconButton>
          <Typography variant="h6" color="inherit">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      {props.children}
    </div>
  );
}
