import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  link: {
    display: "flex",
    color: "#6b6b6b",
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
    color: "#6b6b6b",
  },
  root: {
    display: "flex",
    backgroundColor: "#1b1b1b",
    height: 70,
    justifyContent: "center",
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Breadcrumbs aria-label="breadcrumb" className={classes.root}>
      <Link
        color="inherit"
        href="https://kenzie.com.br/"
        className={classes.link}
        target="blank"
      >
        Projeto conclusão Q4 - Kenzie Academy Brasil
      </Link>

      <Link
        color="inherit"
        href="https://www.linkedin.com/school/kenzie-academy-brasil/"
        className={classes.link}
        target="blank"
      >
        <LinkedInIcon className={classes.icon} />
      </Link>
      <Link
        color="inherit"
        href="https://www.instagram.com/kenzieacademybr/"
        className={classes.link}
        target="blank"
      >
        <InstagramIcon className={classes.icon} />
      </Link>
    </Breadcrumbs>
  );
};
export default Footer;
