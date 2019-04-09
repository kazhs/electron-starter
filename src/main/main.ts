import { BrowserWindow, app, App } from 'electron';

class SampleApp {
  private mainWindow: BrowserWindow | null = null;
  private mainURL: string = `file://${__dirname}/../index.html`;

  constructor(private app: App) {
    this.app.on('window-all-closed', this.onWindowAllClosed.bind(this));
    this.app.on('ready', this.create.bind(this));
    this.app.on('activate', this.onActivated.bind(this));
  }

  private onWindowAllClosed() {
    this.app.quit();
  }

  private create() {
    this.mainWindow = new BrowserWindow({
      width: 800,
      height: 400,
      minWidth: 500,
      minHeight: 200,
      acceptFirstMouse: true,
    });

    this.mainWindow.loadURL(this.mainURL);
    this.mainWindow.on('closed', () => this.mainWindow = null);
  }

  private onActivated() {
    if (this.mainWindow === null) {
      this.create();
    }
  }
}

new SampleApp(app);
