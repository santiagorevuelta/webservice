
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class AuthController {


    /*
    |--------------------------------------------------------------------------
    | Auth: autenticar webservice
    |--------------------------------------------------------------------------
    |
    | expone el servicio para validar el UID y la KEY y conectar al webservice
    | 
    |
    */
    public async auth ({  response, request  }: HttpContextContract) {

        //validamos los datos de entrada
        const body = request.post();
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
        const ws_key = process.env.WS_KEY;
        const ws_uid = process.env.WS_UID;
        let key = ws_key+ws_uid;

        shasum.update(key);
        const shasumkey = shasum.digest('hex');

        //comparamos los hash
        if(body.uid != ws_uid || body.hash_key != shasumkey){
            return response.status(200).json({
                status:false,
                msg:'El uid o el hash_key no son validos.'
            });
        }

        //Application.publicPath('images/logos')
        return response.status(200).json({
            status:true,
            msg:'Auth ok'
        });
    }
}
