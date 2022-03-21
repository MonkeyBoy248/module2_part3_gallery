import * as express from 'express';
import { Request, Response } from "express";
import { Controller } from "../interfaces/controller";
import { authorized_users } from "../authorized_users_list";
import { User } from '../interfaces/user';
import {AuthenticationErrorMessage, TokenObject} from "../interfaces/token_object";

export class AuthenticationController implements Controller {
  public path = '/authentication';
  private token: TokenObject = {token: 'token'};
  private authenticationError: AuthenticationErrorMessage = {errorMessage: 'forbidden'};
  public router = express.Router();

  constructor() {
    this.setRoute();
  }

  public setRoute () {
    return this.router.post(this.path, this.sendAuthenticationResponse);
  }

  isThisCorrectUser = (user: User): boolean => {
    if (!authorized_users[user.email]) {
      return false;
    }

    if (authorized_users[user.email] !== user.password) {
      return false;
    }

    return true;
  }

  sendAuthenticationResponse = (req: Request, res: Response) => {
    const userData: User = {
      email: req.body.email,
      password: req.body.password,
    }

    if (!this.isThisCorrectUser(userData)) {
      res.status(200).json(this.authenticationError)
      return;
    }

    res.status(200).json(this.token);
  }
}