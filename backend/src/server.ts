import express from 'express';
import bodyParser from "body-parser";
import { AuthenticationController } from "./controllers/authentication_controller";
import { GalleryController } from "./controllers/gallery_controller";
import dotenv from 'dotenv';
import path from "path";
import { nonexistentPageHandler } from "./middleware/404_handler";
import { Logger } from "./middleware/logger";

dotenv.config();

const app = express();
const authenticationController = new AuthenticationController();
const galleryController = new GalleryController();
const logger = new Logger();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(logger.writeLogs);

app.use(authenticationController.router);
app.use(galleryController.router);

app.use('/',
  express.static(path.join(__dirname, '..', 'views', 'pages')),
  express.static(path.join(__dirname, '..', 'views')),
  express.static(path.join(__dirname, '..', 'public')),
)

app.use(nonexistentPageHandler);

app.listen(port, () => console.log(`Server is running on port ${port}.
${process.env.PROTOCOL}://${process.env.HOSTANME}:${process.env.PORT}`));