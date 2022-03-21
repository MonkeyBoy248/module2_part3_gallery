import express from 'express';
import bodyParser from "body-parser";
import { AuthenticationController } from "./controllers/authentication_controller";
import { GalleryController } from "./controllers/gallery_controller";
import dotenv from 'dotenv';
import path from "path";
import {nonexistentPageHandler} from "./middleware/404_handler";

dotenv.config();

const app = express();
const authenticationController = new AuthenticationController();
const galleryController = new GalleryController();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/',
  express.static(path.join(__dirname, '..', 'backend', 'views', 'pages')),
  express.static(path.join(__dirname, '..', 'backend', 'views')),
  express.static(path.join(__dirname, '..', 'backend', 'public'))
)

app.use(authenticationController.router);
app.use(galleryController.router);

app.use(nonexistentPageHandler);

app.listen(port || 8000, () => console.log(`Server is running on port ${port}.
${process.env.PROTOCOL}://${process.env.HOSTANME}:${process.env.PORT}`));