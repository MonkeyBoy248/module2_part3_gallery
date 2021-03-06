import {Request, Response, NextFunction, json} from "express";
import {setDateFormat, writeLogs} from "../utils/log_format";

export class Logger {
  private setRequestBodyFormat = (req: Request) => {
    const bodyValuesArray: string[] = [];

    for (const [key, value] of Object.entries(req)) {
      bodyValuesArray.push(`${key}: ${value}`)
    }

    return bodyValuesArray.join(', ');
  }

  private setRequestInfoFormat = (req: Request) => {
    const reqMethod = req.method;
    const reqProtocol = req.protocol;
    const reqProtocolVersion = req.httpVersion;
    const reqHost = `${req.hostname}-${process.env.PORT}`;
    const reqUrl = req.url;

    let logTemplate = `[${reqProtocol}:${reqProtocolVersion}-${reqHost}] ${reqMethod}:${reqUrl}`;

    if (req.method.toLowerCase() === 'post') {
      const reqBody = this.setRequestBodyFormat(req.body);
      logTemplate += ` {${reqBody}}`
    }

    return logTemplate;
  }

  setLogsFormat = (req: Request) => {
    const dateInfo = setDateFormat();
    const requestInfo = this.setRequestInfoFormat(req);

    return `${dateInfo} ${requestInfo}`;
  }

  showLogs = (req: Request, res: Response, next: NextFunction) => {
    console.log(this.setLogsFormat(req));
    next();
  }

  writeLogs = async (req: Request, res: Response, next: NextFunction) => {
    const logsFormat = this.setLogsFormat(req);

    res.on('finish',  async function (this: Response) {
      const resStatus = this.statusCode;
      const resMessage = this.statusMessage;
      const resTemplate = resMessage ? `${resStatus}:${resMessage}`
        :
        `status:${resStatus}`

      await writeLogs(`${logsFormat} ${resTemplate}`);
    })

    next();
  }
}


