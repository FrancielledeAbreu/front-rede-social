import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import DehazeIcon from "@material-ui/icons/Dehaze";

//based on reference https://material-ui.com/components/menus/#menus

//style
import { Container, Title } from "./header.sytle";

//locals
import { useStyles } from "../../utils";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <Container>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <DehazeIcon
          fontSize="large"
          className={classes.colorPrimary}
          color="primary"
        />
      </Button>
      <Title>FollowKenzie</Title>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <a href="/">Login</a>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <a href="/cadastro">Cadastro</a>
        </MenuItem>
      </Menu>
    </Container>
  );
};

export default Header;
