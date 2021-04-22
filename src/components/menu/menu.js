import { Menu, Button } from "antd";
import VpnLockIcon from "@material-ui/icons/VpnLock";
import FaceIcon from "@material-ui/icons/Face";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import PublicIcon from "@material-ui/icons/Public";
import { Link, useHistory } from "react-router-dom";
import TimelineIcon from "@material-ui/icons/Timeline";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";

//locals
import { setLogout } from "../../redux/actions/services-request";

const MenuModel = ({
  title,
  Timeline,
  Seguindo,
  Seguidores,
  Post,
  Info,
  Feed,
  Exploradores,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const exit = () => {
    localStorage.clear();
    dispatch(setLogout(null, null));
    history.push("/");
  };
  return (
    <>
      <Menu
        style={{
          backgroundColor: "#cf0063",
          width: 300,
          fontSize: 20,
          color: "#ffff",
        }}
        mode="inline"
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 25,
            marginTop: "40px",
            marginBottom: "40px",
            justifyContent: "center",
          }}
        >
          <FaceIcon fontSize="large" /> {title}
        </div>

        {Seguidores && (
          <Menu.Item key="1" icon={<HowToRegIcon />}>
            {Seguidores}
          </Menu.Item>
        )}
        {Seguindo && (
          <Menu.Item key="2" icon={<DirectionsRunIcon />}>
            {Seguindo}
          </Menu.Item>
        )}
        {Timeline && (
          <Menu.Item key="3" icon={<PublicIcon />}>
            <Link
              style={{
                color: "#ffff",
              }}
              to="/timeline"
            >
              Explore
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key="4" icon={<VpnLockIcon />}>
          <Link
            style={{
              color: "#ffff",
            }}
            to="/timeline-private"
          >
            Timeline Privada
          </Link>
        </Menu.Item>

        {Exploradores && (
          <Menu.Item key="5" icon={<FaceIcon />}>
            <Link
              style={{
                color: "#ffff",
              }}
              to="/all-users"
            >
              {Exploradores}
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key="6">{Post}</Menu.Item>
        <Menu.Item key="7">{Info}</Menu.Item>
        {Feed && (
          <Menu.Item key="8" icon={<TimelineIcon />}>
            <Link
              style={{
                color: "#ffff",
              }}
              to="/feed"
            >
              {Feed}
            </Link>
          </Menu.Item>
        )}
        <Menu.Item key="9">
          <Button
            onClick={exit}
            danger
            style={{ paddingLeft: "40px", paddingRight: "40px" }}
          >
            <ExitToAppIcon />
          </Button>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MenuModel;
