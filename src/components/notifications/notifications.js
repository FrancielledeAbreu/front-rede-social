import { Modal } from "antd";

export const info = (notificationsList) => {
  Modal.info({
    title: "Suas notificações!",
    content: (
      <div>
        {notificationsList.length > 10
          ? notificationsList.slice(0, 9).map((item, i) => {
              return (
                <p>{`${item.text} na data : ${
                  item.created_at && item.created_at.slice(0, 10)
                }`}</p>
              );
            })
          : notificationsList.map((item, i) => {
              return (
                <p>{`${item.text} na data : ${
                  item.created_at && item.created_at.slice(0, 10)
                }`}</p>
              );
            })}
      </div>
    ),
    onOk() {},
  });
};
