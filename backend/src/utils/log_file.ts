import fs from "fs";
import path from "path";
import {Logger} from "../middleware/logger";
import {Request} from "express";

let fileName = setDateFormat();

function pad (value: number)  {
  if (value < 10) {
    return '0' + value;
  }

  return value;
}

export function setDateFormat ()  {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = pad(currentDate.getMonth() + 1);
  const currentDay = pad(currentDate.getDate());
  const currentHours = pad(currentDate.getHours());
  const currentMinutes = pad(currentDate.getMinutes());
  const currentSeconds = pad(currentDate.getSeconds());

  return `${currentYear}-${currentMonth}-${currentDay} ${currentHours}:${currentMinutes}:${currentSeconds}`;
}

setInterval(() => {
  fileName = setDateFormat();
}, 30000)

function openNewFileStream (data: string) {
  const stream = fs.createWriteStream (path.join('logs', fileName), {flags: 'a'});
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