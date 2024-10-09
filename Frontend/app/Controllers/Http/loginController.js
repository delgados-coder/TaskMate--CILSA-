'use strict'

class loginController {

  async index({ response }) {
    const rutaArchivo = path.join(__dirname, '../../../resources/views/login/index.hbs')
    const plantillaCargada = fs.readFileSync(rutaArchivo, 'utf-8')
    const plantillaCompilada = Handlebars.compile(plantillaCargada)
    const html = plantillaCompilada()
    response.send(html)
  }

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//

  async login({ request, response }) {  
     const { email, password } = request.all();  
     const rutaArchivo = path.join(__dirname, '../../../resources/views/home/index.hbs')
     const plantillaCargada = fs.readFileSync(rutaArchivo, 'utf-8')
     const plantillaCompilada = Handlebars.compile(plantillaCargada)
     const html = plantillaCompilada()
     response.send(html)
    }  

}

module.exports = loginController