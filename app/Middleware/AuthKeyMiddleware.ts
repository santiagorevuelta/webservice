import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthKeyMiddleware {
  /*
    |--------------------------------------------------------------------------
    | Auth: autenticar webservice
    |--------------------------------------------------------------------------
    |
    | middleware para validar el UID y la KEY y conectar al webservice, esta presente de forma
    | global, para todas las rutas y controladores valida estos datos
    | Params:
    | hash_key=hash('sha512',(key del proyecto)+(uid del proyecto))
    | uid = uid del proyecto
    | 
    | Las variables son generadas automaticamente al crear el proyecto, estas se guardan como variables de entorno (ver .env)
    | con los nombre: WS_KEY  y  WS_UID, estos datos son únicos por proyecto, conservar y guardar con total seguridad
    |
    | para rutas GET usar las variables como Params, para las rutas POST, pasar como objeto JSON
    | Ejem POST: 
    |  {
    |    "uid":"mi uid",
    |    "hash_key":"hash 512 "
    |  }
    */
  public async handle ({request, response }: HttpContextContract, next: () => Promise<void>) {
    //validamos los datos de entrada
    const body = request.only(['hash_key', 'uid']);
    if(!body.hash_key){
        return response.status(200).json({
            status:false,
            msg:'El hash_key es requerido.'
        });
    }

    if(!body.uid){
        return response.status(200).json({
            status:false,
            msg:'El uid es requerido.'
        });
    }

    const crypto = require('crypto');
    let shasum = crypto.createHash('sha512');
    const ws_key = process.env.WS_KEY?process.env.WS_KEY:"";
    const ws_uid = process.env.WS_UID?process.env.WS_UID:"";
    let key = ws_key+ws_uid;

    shasum.update(key);
    const shasumkey = shasum.digest('hex');

    //comparamos los hash
    if(body.uid != ws_uid || body.hash_key != shasumkey){
        return response.status(200).json({
            status:false,
            msg:'El uid o el hash_key no son válidos.'
        });
    }

    //Application.publicPath('images/logos')
    /* return response.status(200).json({
        status:true,
        msg:'Auth ok'
    }); */
    console.log("Auth ok.");
    await next()
  }
}
