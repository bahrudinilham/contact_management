import ServerManager from "./ServerManager";

export default function makeServer() {
  const serverManager = new ServerManager();
  return serverManager.start();
}
