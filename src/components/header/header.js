import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

//style
import { Container, Title } from "./header.sytle";

const Header = ({ testID }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const useStyles = makeStyles((theme) => ({
    colorPrimary: {
      color: "#ffff",
    },
  }));

  const classes = useStyles();
  return (
    <Container data-testid={`${testID}_Header`}>
      <Button
        data-testid={`${testID}_Button`}
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
        <MenuItem onClick={handleClose}>Sair</MenuItem>
      </Menu>
    </Container>
  );
};

export default Header;

Header.propTypes = {
  testID: PropTypes.string.isRequired,
};

Header.defaultProps = {
  testID: "Container",
};
