import axios from 'axios';
import qs from 'querystring';
import config from '../config';

const params = qs.stringify({ 'grant_type': 'client_credentials' });
const settings = { 
  headers: { Authorization: `Basic ${btoa(`${config.api.clientId}:${config.api.clientSecret}`)}` } 
}

export default async function api(url) {
  const tokenResponse = await axios.post(config.api.authUrl, params, settings);

  const dataResponse = await axios.get(`${config.api.baseUrl}/browse/${url}`,
  {  
    headers: { Authorization: `Bearer ${tokenResponse.data.access_token}` } 
  });
    
  return dataResponse.data;
}