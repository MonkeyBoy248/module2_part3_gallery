import fs from "fs";
import path from "path";

let fileName = setDateFormat();

export function setDateFormat ()  {
  const currentDate = new Date();
  return currentDate.toISOString();
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