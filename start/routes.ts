/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'

Route.get('/', async () => {
  return { 
    status: true,
    msg: 'Webservice success',
    app_name: process.env.APP_TITLE,
    adonis_version: process.env.ADONIS_VERSION 
  }
})


//verifica conexión a la BD habilitar la healthCheck dentro del archivo config/database.ts
Route.get('/health', async ({ response }) => {
  const report = await HealthCheck.getReport()
  
  return report.healthy
    ? response.ok(report)
    : response.badRequest(report)
})


// Grouped
Route.group(() => {

  Route.get('/', async () => {
    return { 
      status: true,
      msg: 'api v1',
      app_name: process.env.APP_TITLE,
      adonis_version: process.env.ADONIS_VERSION 
    }
  }).as('info')

  //ruta para conexión demo
  Route.post('/auth', 'AuthController.auth').as('auth')


  
}).prefix('/api/v1').as('api.v1')