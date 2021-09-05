export default class IntegrationBackend {
  //private baseUrl = 'https://backend-art-experience.herokuapp.com';
  //private baseUrl = 'http://artexperienceproductioninstance-env.eba-iimpqhxr.us-east-2.elasticbeanstalk.com';
  
  /* With SSL Certificate Domain to router new Backend on AWS ELB */
  /* Todo:
        Temporalmente caido, estamos trabajando para resolverlo
        Problemas: AWS Certificate Manager, Route53, LoadBalancer HTTPS
        caus: Basicamente no funciona la escucha por HTTPS, esto se debe a que el load balancer no lo entiende bien, 
              mala configuracion o algo con ACM cerificate Manager el tema es que tenemos que resolver eso para que se conecte back y front.
  
        Nota: Los servidores del dominio de GoDaddy estan en Route53 por lo que todo el redireccionamiento esta en AWS. igual probar diferentes cosas.
  
  private baseUrl = 'https://back-artexperience.xyz'; 
  */
  
  /*    Heroku apuntando a nuestra base de datos de AWS 
        Plan B, Pagar el servicio de heroku mensual para que nos hostee la app mientras resolvemos o entendemos mejor lo de AWS.
        Plan de 7 USD por mes
  */
  //private baseUrl = 'https://back-artexperience-aws-rds.herokuapp.com';
  private baseUrl = 'http://localhost:8080';
  
  private axios = require('axios');

  async send(method: string, data?: any, route?: string) {
    this.axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const config = {
      method: method,
      url: this.baseUrl + (route == undefined ? '' : route),
      data: {
        ...data // This is the body part
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    const res = await this.axios(config);
    return res;
  }
}
