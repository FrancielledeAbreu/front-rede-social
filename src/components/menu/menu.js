import { Menu } from "antd";
import VpnLockIcon from "@material-ui/icons/VpnLock";
import FaceIcon from "@material-ui/icons/Face";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import DirectionsRunIcon from "@material-ui/icons/DirectionsRun";
import PublicIcon from "@material-ui/icons/Public";

const MenuModel = ({
  title,
  Private,
  Todos,
  Seguindo,
  Seguidores,
  Post,
  Info,
  Public,
}) => {
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

        <Menu.Item key="1" icon={<HowToRegIcon />}>
          {Seguidores}
        </Menu.Item>
        <Menu.Item key="2" icon={<DirectionsRunIcon />}>
          {Seguindo}
        </Menu.Item>
        <Menu.Item key="3" icon={<PublicIcon />}>
          {Public}
        </Menu.Item>
        <Menu.Item key="4" icon={<VpnLockIcon />}>
          {Private}
        </Menu.Item>
        <Menu.Item key="5" icon={<FaceIcon />}>
          {Todos}
        </Menu.Item>
        <Menu.Item key="6">{Post}</Menu.Item>
        <Menu.Item key="7">{Info}</Menu.Item>
      </Menu>
    </>
  );
};

export default MenuModel;
