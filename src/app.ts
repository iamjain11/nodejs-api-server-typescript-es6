import * as express from 'express'
import * as bodyParser from "body-parser";
import * as mongoose from 'mongoose';
import { basename } from "path";
import { config } from "./config/config";
import { APILogger } from "./utilities/logger.util";
import { ContactRoutes } from "./routes/contact.server.routes"
let logger = new APILogger().initLogger(basename(__filename))

class App {
  public app
  public contactRoutes: ContactRoutes = new ContactRoutes()

  constructor() {
    this.app = express();
    this.config();
    this.connectDb();
    this.mountRoutes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  private connectDb(): void {
    mongoose.connect(config.DB_URL, { useNewUrlParser: true }).then((dbResponse: any) => {
      logger.info('db connected successfully : db_name [%s] : host_name [%s] : user_name [%s]', dbResponse.connection.name, dbResponse.connection.host, dbResponse.connection.user);

    }).catch((err: any) => {
      logger.fatal('db failed to connect : ', err)
    })
  }

  private mountRoutes(): void {

    this.app.route('/').get((req, res) => {
      res.json({
        message: 'WellCome to Api Gateway!'
      })
    })

    this.contactRoutes.routes(this.app);

  }
}

export default new App().app
