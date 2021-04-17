import * as vscode from "vscode";
import { apiBaseUrl } from "./constants";
import * as polka from "polka";
import { TokenManager } from "./TokenManager";

export const authenticate = (cb: () => void) => {
  const app = polka();

  app.get("/auth/:token", async (req, res) => {
    const { token } = req.params;
    if (!token) {
      res.end("<h1>Oops! Something went wrong!");
      return;
    }
    console.log({ token });
    TokenManager.setToken(token);

    res.end("<h1>Auth was successfull. You may close this now.</h1>");
    cb();
    app.server?.close();
  });

  app.listen(54321, (err: Error) => {
    if (err) {
      vscode.window.showErrorMessage(err.message);
    } else {
      vscode.commands.executeCommand(
        "vscode.open",
        vscode.Uri.parse(`${apiBaseUrl}/auth/github`)
      );
    }
  });
};
