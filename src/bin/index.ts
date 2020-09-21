import next from 'next';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from '../config/index';
const {
  server: { port },
  api: { credentials },
} = config;
const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const expressApp = express();
const handle = nextApp.getRequestHandler();
export const main = async () => {
  await nextApp.prepare();
  expressApp.use(cookieParser());
  expressApp.use(express.json());
  expressApp.use(express.urlencoded({ extended: true }));
  expressApp.use(
    cors({
      origin: 'http://localhost:3000',
      credentials,
    })
  );
  expressApp.all('*', (req, res) => {
    return handle(req, res);
  });
  await expressApp.listen(port);
  //console.log(`Server running at port ${port}`);
};
