import axios from 'axios';
import {setAuthStorage} from '../config/Storage';
import httpClient from './HttpClient';

class UserController {
  constructor() {
    this.basePath = '/login_mobile';
  }

  login = async (email, password) => {
    try {
      const result = await httpClient.request({
        url: '/login_mobile',
        method: 'POST',
        data: {
          email,
          password,
          token: '',
          device: 'ios',
          mac: 'mac',
        },
      });
      // alert(result.Pesan);

      if (result.Error) {
        return Promise.reject(result.Pesan);
      } else {
        return result;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  resetPassword = async (conPass, newPass, email) => {
    try {
      const result = await httpClient.request({
        url: `${this.basePath}/Resetpass`,

        method: 'POST',
        data: {
          conpass: conPass,
          newpass: newPass,
          email: email,
        },
      });
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  logout = () => null;
}

export default new UserController();
