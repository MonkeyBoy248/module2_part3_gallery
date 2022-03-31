import fs from "fs";
import path from "path";
import {paths} from "../config";

let fileName = setDateFormat();

export function setDateFormat ()  {
  const date = new Date();

  return date.toISOString();
}

setInterval(() => {
  fileName = setDateFormat();
}, 3600000)

function openNewFileStream (data: string) {
  const stream = fs.createWriteStream (path.join(paths.LOGS_PATH, fileName), {flags: 'a'});
  stream.write(data + '\n');
}

export async function writeLogs (log: string) {
  try {
    if (!fs.existsSync('logs')) {
      await fs.promises.mkdir('logs');
    }

    openNewFileStream(log);

  } catch (err) {
   console.log(err);
  }
}