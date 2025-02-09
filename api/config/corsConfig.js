import cors from 'cors';

const allowList = ['http://localhost:3000', 'http://127.0.0.1:5500'] //Setear dominios que van a consumir la api

console.log('Cors configurado para ' . allowList)
const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  const origin = req.header('Origin');
  console.log(`Solicitud desde origen: ${origin}`);
  if (allowList.indexOf(origin) !== -1) {
    corsOptions = { origin: true }
  } else {
    corsOptions = { origin: false }
  }
  callback(null, corsOptions)
}

export default cors(corsOptionsDelegate);
