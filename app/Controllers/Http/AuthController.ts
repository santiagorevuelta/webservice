
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class AuthController {

    /**
     * 
     * Revisar middleware app/Middleware/AuthKeyMiddleware, para la validación al webservice
     * 
     * 
     */
    public async auth ({  response  }: HttpContextContract) {

        

        //Application.publicPath('images/logos')
        return response.status(200).json({
            status: true,
            msg: 'Auth verificado',
            app_name: process.env.APP_TITLE,
            adonis_version: process.env.ADONIS_VERSION
        });
    }
}
