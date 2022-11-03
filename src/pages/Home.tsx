import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";

import { io } from "socket.io-client";
import { isPlatform, getPlatforms } from "@ionic/react";

// TESTING PURPOSES ONLY!
// Get an ip address from a prompt and use it to contact the backend

console.log("Running on platform ", getPlatforms());

let addr = "192.168.0.135";

if (isPlatform("electron")) {
  console.log(
    "electron has no classic prompts support, using hard coded address " + addr
  );
} else {
  let regExp =
    /(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/gi;

  let addr = window.prompt(
    "Enter an ip address (omitting port 3002)",
    "192.168.0.135"
  );

  while (addr == null || !regExp.test(addr)) {
    addr = window.prompt(
      "Enter an ip address (omitting port 3002)",
      "192.168.0.135"
    );
  }
}

// END

// defines the socket.io connection with special parameters
const socket = io(addr + ":3002", {
  reconnectionDelay: 100, // defines the reconnection delay in ms
  reconnectionDelayMax: 500, // defines the maximum reconnection delay in ms
  randomizationFactor: 0.01, // defines a randomization factor, since socket.io internally randomizes the actual reconnectionDelay
});

// if the JWT token is rejected by the backend, the frontend is unauthorized - this case is caught here
socket.on("unauthorized", (error) => {
  if (
    error.data.type === "UnauthorizedError" ||
    error.data.code === "invalid_token"
  ) {
    // redirect user to login page perhaps?
    console.log("User token has expired");
  }
});

socket.on("connect", () => {
  console.log("connect");
});

socket.on("connect_error", () => {
  console.log("connect_error");
});

// catches the case that something went wrong during reconnecting
socket.on("reconnect_error", () => {
  console.log("reconnect_error");
});

// catches an unexpected error with the socket.io connection
socket.on("error", (error) => {
  console.log("caught uncaughtException in socket.on(err)");
  console.log(error);
});

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Blank</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Home;
