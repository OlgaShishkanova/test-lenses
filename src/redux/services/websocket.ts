interface Props {
  path: string;
  sql: string;
  stats: number;
  live: boolean;
  messagesLimit?: 10000;
  // Instead of unknown here should be the interface of message data
  getOnMessage: (arg: unknown) => void;
}

const connectToWebsocket = (props: Props) => {
  let messagesCounter = 0;
  const token = sessionStorage.getItem("token");
  const parsedToken = token && JSON.parse(token);
  const socket = new WebSocket(`ws://${window.location.host}${props.path}`);
  const request = {
    token: parsedToken,
    stats: props.stats,
    sql: props.sql,
    live: props.live,
  };
  socket.onopen = (e) => {
    console.log("[open] Connection established");
    socket.send(JSON.stringify(request));
  };
  socket.onmessage = (event) => {
    const parsedData = JSON.parse(event.data);
    // Here it is intended for the fact that event.data will always have the same structure
    if (parsedData.type === "RECORD") {
      props.getOnMessage(parsedData);
      if (props.messagesLimit) {
        messagesCounter++;
        if (messagesCounter === props.messagesLimit) {
          socket.close();
        }
      }
    }
  };

  socket.onclose = (event) => {
    if (event.wasClean) {
      console.log(
        `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`
      );
    } else {
      console.log("[close] Connection died");
    }
  };

  socket.onerror = (event) => {
    console.log(`[error] ${event}`);
  };
};
export default connectToWebsocket;
