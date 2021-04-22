/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FaceIcon from "@material-ui/icons/Face";
import BusinessIcon from "@material-ui/icons/Business";
import { Button, Card } from "antd";

//style
import { Main, User, Company, Container, Header, Icon } from "./users-style";

//locals
import { handleUsers, follow, useStyles } from "../../utils";
import MenuModel from "../../components/menu/menu";
import Footer from "../../components/footer/footer";

const Users = () => {
  const user = useSelector((state) => state.serviceReducer);
  const [users, setusers] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    handleUsers(user, setusers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header> All users</Header>
      <Main>
        <MenuModel title="Exploradores" Feed="Feed" Timeline="Explore" />
        <Container>
          <User>
            <Icon>
              User
              <FaceIcon fontSize="large" className={classes.icon} />
            </Icon>

            {users.results &&
              users.results
                .filter(
                  (item) => item.type === "client" || item.type === "User"
                )
                .map((item, i) => {
                  let idCurrent = parseInt(item.id);

                  return (
                    <Card
                      key={i}
                      style={{
                        width: 300,
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {item.username}
                      <Button
                        onClick={() => follow(user, idCurrent)}
                        danger
                        size="small"
                      >
                        Seguir
                      </Button>
                    </Card>
                  );
                })}
          </User>
          <Company>
            <Icon>
              Company <BusinessIcon fontSize="large" className={classes.icon} />
            </Icon>

            {users.results &&
              users.results
                .filter((item) => item.type === "Company")
                .map((item, i) => {
                  let idCurrent = parseInt(item.id);

                  return (
                    <Card
                      key={i}
                      style={{
                        width: 300,
                        padding: "2%",
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      {item.username}
                      <Button
                        onClick={() => follow(user, idCurrent)}
                        danger
                        size="small"
                      >
                        Seguir
                      </Button>
                    </Card>
                  );
                })}
          </Company>
        </Container>
      </Main>
      <Footer />
    </>
  );
};

export default Users;
