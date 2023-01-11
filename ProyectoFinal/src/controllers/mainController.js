import path from 'path';
const __dirname = path.resolve();
import process from 'process'
import os from 'os';


async function home (req, res){
    res.redirect('api/productos');
};

async function getServerInfo(req, res){
   const info = {
    plataforma: { description: 'plataforma', value: process.platform },
    versionNode: { description: 'version de node', value: process.version },
    memoriaRSS: { description: 'memoria total reservada (MB)', value: parseInt(process.memoryUsage().rss / 1024 / 1024) },
    pid: { description: 'id de proceso', value: process.pid },
    numeroCPUS: {descrition:'cantidad de CPUS en uso' , value: os.cpus().length}
   }
   res.status(200).send({ServerInfo: info})
}


export{
    home,
    getServerInfo
}