import { Menu } from "antd";
import VpnLockIcon from "@material-ui/icons/VpnLock";

const MenuModel = () => {
  return (
    <Menu
      style={{ width: 256 }}
      defaultSelectedKeys={["1"]}
      defaultOpenKeys={["sub1"]}
      mode="inline"
    >
      <Menu.Item key="1" icon={<VpnLockIcon />} title="Navigation One">
        hfhfhh
      </Menu.Item>
    </Menu>
  );
};

export default MenuModel;
