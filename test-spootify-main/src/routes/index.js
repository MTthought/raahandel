import React, { useEffect, useState } from 'react';
import axios from 'axios';
import qs from 'querystring';
import Discover from './Discover';
import config from '../config';
import Token from './token';

export default function Routes() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    axios.post(config.api.authUrl, qs.stringify({ 'grant_type': 'client_credentials' }),
    {
      headers: { Authorization: `Basic ${btoa(`${config.api.clientId}:${config.api.clientSecret}`)}` }
    })
    .then(response => setToken(response.data.access_token));
  }, []);
  console.log('auth token:', token);

  const [newReleases, setNewReleases] = useState(null);
  const [errorRelease, setErrorRelease] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [errorPlaylist, setErrorPlaylist] = useState(null);
  const [categories, setCategories] = useState(null);
  const [errorCategory, setErrorCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const endPoints = ['new-releases', 'featured-playlists', 'categories'];
  // cheatToken taken from https://developer.spotify.com/console/get-new-releases/
  const settings = { headers: { Authorization: `Bearer ${Token.cheatToken}` } }

    useEffect(() => {
      setLoading(true);
      fetch(`${config.api.baseUrl}/browse/${endPoints[0]}`, settings)
      .then(response => response.json())
      .then(setNewReleases)
      .then(() => setLoading(false))
      .catch(setErrorRelease)
    }, endPoints);

    useEffect(() => {
      setLoading(true);
      fetch(`${config.api.baseUrl}/browse/${endPoints[1]}`, settings)
      .then(response => response.json())
      .then(setPlaylists)
      .then(() => setLoading(false))
      .catch(setErrorPlaylist)
    }, endPoints);

    useEffect(() => {
      setLoading(true);
      fetch(`${config.api.baseUrl}/browse/${endPoints[2]}`, settings)
      .then(response => response.json())
      .then(setCategories)
      .then(() => setLoading(false))
      .catch(setErrorCategory)
    }, endPoints);
    
    if(errorRelease || errorPlaylist || errorCategory){
      if(errorRelease){
        console.log('error releases ->', errorRelease);
      }
      if(errorPlaylist){
        console.log('error playlists ->', errorPlaylist);
      }
      if(errorCategory){
        console.log('error categories ->', errorCategory);
      }

      return(<h2>Something went wrong...</h2>)
    }
  
    if(loading){
      return(<h2>Loading...</h2>)
    }

    if(!newReleases || !playlists || !categories){
      return null;
    }

    if(newReleases.error){
      console.log('error:', newReleases.error.message);
      return(<h2>Something went wrong...</h2>)
    }
  // Here you'd return an array of routes
  return <Discover newReleases={newReleases} playlists={playlists} categories={categories} />;
}
