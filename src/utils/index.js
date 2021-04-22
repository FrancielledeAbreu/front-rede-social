import api from "../services";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { makeStyles } from "@material-ui/core/styles";
import { notification } from "antd";

//requests
export const axiosConfig = (token) => ({
  headers: {
    Authorization: `Token ${token}`,
  },
});

export const handleFeed = (user, setFeed) => {
  if (user.user == null) {
    return api
      .get(
        "/api/timeline/private",
        axiosConfig(JSON.parse(localStorage.getItem("user")).token)
      )
      .then(({ data }) => {
        setFeed(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  } else {
    return api
      .get("/api/timeline/private", axiosConfig(user.user.token))
      .then(({ data }) => {
        console.log(data);
        setFeed(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }
};

export const like = (id, user) => {
  if (user.user == null) {
    return api
      .post(
        `/api/timeline/post/${id}/like/`,
        {},
        axiosConfig(JSON.parse(localStorage.getItem("user")).token)
      )
      .then(({ data }) => {
        console.log(data);
        notification.open({
          message: "Like!",

          icon: <FavoriteBorderIcon />,
        });
      })
      .catch(({ response }) => {
        console.log(response);
      });
  } else {
    return api
      .post(`/api/timeline/post/${id}/like/`, {}, axiosConfig(user.user.token))
      .then(({ data }) => {
        console.log(data);
        notification.open({
          message: "Like!",

          icon: <FavoriteBorderIcon />,
        });
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }
};

export const newComment = (user, values, currentId, setVisible) => {
  if (user.user == null) {
    return api
      .post(
        `/api/comments/${currentId}/new/`,
        {
          ...values,
        },
        axiosConfig(JSON.parse(localStorage.getItem("user")).token)
      )
      .then(({ data }) => {
        console.log(data);
        notification.success({
          message: `${data.author.username} Obrigado pelo comentário`,
        });
        setVisible(false);
      })
      .catch(({ response }) => {
        console.log(response);
        notification.error({
          message: "Algo deu errado, desculpe!",
        });
      });
  } else {
    return api
      .post(
        `/api/comments/${currentId}/new/`,
        {
          ...values,
        },
        axiosConfig(user.user.token)
      )
      .then(({ data }) => {
        console.log(data);
        notification.success({
          message: `${data.author.username} Obrigado pelo comentário`,
        });
        setVisible(false);
      })
      .catch(({ response }) => {
        console.log(response);
        notification.error({
          message: "Algo deu errado, desculpe!",
        });
      });
  }
};

export const handleUsers = (user, setusers) => {
  if (user.user == null) {
    return api
      .get(
        "/api/members/",
        axiosConfig(JSON.parse(localStorage.getItem("user")).token)
      )
      .then(({ data }) => {
        setusers(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  } else {
    return api
      .get("/api/members/", axiosConfig(user.user.token))
      .then(({ data }) => {
        setusers(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }
};

export const follow = (user, id) => {
  console.log(id);
  if (user.user == null) {
    return api
      .post(
        `/api/members/${id}/follow/`,
        {},
        axiosConfig(JSON.parse(localStorage.getItem("user")).token)
      )
      .then(({ data }) => {
        console.log(data);
        notification.success({
          message: `${data}`,
        });
      })
      .catch(({ response }) => {
        console.log(response);
        notification.error({
          message: "Algo deu errado, desculpe!",
        });
      });
  } else {
    return api
      .post(`/api/members/${id}/follow/`, {}, axiosConfig(user.user.token))
      .then(({ data }) => {
        console.log(data);
        notification.success({
          message: `${data}`,
        });
      })
      .catch(({ response }) => {
        console.log(response);
        notification.error({
          message: "Algo deu errado, desculpe!",
        });
      });
  }
};

export const getFeed = (user, setFeed) => {
  if (user.user == null) {
    return api
      .get(
        "/api/feed/",
        axiosConfig(JSON.parse(localStorage.getItem("user")).token)
      )
      .then(({ data }) => {
        console.log(data);
        setFeed(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  } else {
    return api
      .get("/api/feed/", axiosConfig(user.user.token))
      .then(({ data }) => {
        console.log(data);
        setFeed(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }
};

export const newPost = (values, user, setVisible) => {
  if (user.user == null) {
    return api
      .post(
        "/api/timeline/",
        {
          ...values,
        },
        axiosConfig(JSON.parse(localStorage.getItem("user")).token)
      )
      .then(({ data }) => {
        console.log(data);
        notification.success({
          message: "Novo Post criado com sucesso!",
        });
        setVisible(false);
      })
      .catch(({ response }) => {
        console.log(response);
        notification.error({
          message: "Algo deu errado, desculpe!",
        });
      });
  } else {
    return api
      .post(
        "/api/timeline/",
        {
          ...values,
        },
        axiosConfig(user.user.token)
      )
      .then(({ data }) => {
        console.log(data);
        notification.success({
          message: "Novo Post criado com sucesso!",
        });
        setVisible(false);
      })
      .catch(({ response }) => {
        console.log(response);
        notification.error({
          message: "Algo deu errado, desculpe!",
        });
      });
  }
};

export const getNotifications = (user, setNotificationsList) => {
  if (user.user == null) {
    return api
      .get(
        "/api/mynotifications/",
        axiosConfig(JSON.parse(localStorage.getItem("user")).token)
      )
      .then(({ data }) => {
        console.log(data);
        setNotificationsList(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  } else {
    return api
      .get("/api/mynotifications/", axiosConfig(user.user.token))
      .then(({ data }) => {
        console.log(data);
        setNotificationsList(data);
      })
      .catch(({ response }) => {
        console.log(response);
      });
  }
};

//styles

export const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
export const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#ff4d4f",
  },
}));
