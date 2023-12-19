import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import https from 'https';
import http from 'http';

import siteRoutes from './router/site';
import adminRoutes from './router/admin';
import { requestIntersepter } from './utils/requestIntercepter';


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all('*', requestIntersepter);

app.use('/admin', adminRoutes);
app.use('/', siteRoutes);

const runServer = (port: number, server: http.Server) => {
    server.listen(port, () => {
        console.log(` 🚀 Servidor Rodando na porta ${port}`);
    })
}

const regularServer = http.createServer(app);
if (process.env.NODE_ENV === 'production') {
    // TODO: CONFIGURAR SSL
    // TODO: RODAR SERVER NA PORTA 80 E PORTA 443
} else {
    const serverPort: number = process.env.PORT ? parseInt(process.env.PORT) : 9000;
    runServer(serverPort, regularServer);
}