export default class IntegrationBackend {
  private baseUrl = 'https://backend-art-experience.herokuapp.com';
  private axios = require('axios');

  async send(method: string, data?: any, route?: string) {
    this.axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
    const config = {
      method: method,
      url: this.baseUrl + (route == undefined ? '' : route),
      data: {
        ...data
      },
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    };
    let res = await this.axios(config);
    return res.data;
  }
}
