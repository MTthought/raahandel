import React, { useEffect, useState } from 'react';
import Discover from './Discover';
import api from './api';

export default function Routes() {
  const [newReleases, setNewReleases] = useState(null);
  const [errorRelease, setErrorRelease] = useState(null);
  const [playlists, setPlaylists] = useState(null);
  const [errorPlaylist, setErrorPlaylist] = useState(null);
  const [categories, setCategories] = useState(null);
  const [errorCategory, setErrorCategory] = useState(null);
  const [loading, setLoading] = useState(false);

  const endPoints = [
    { 
      'url': 'new-releases',
      'key': 'albums',
      'dataSetter': setNewReleases,
      'errorSetter': setErrorRelease
    }, 
    {
      'url': 'featured-playlists',
      'key': 'playlists',
      'dataSetter': setPlaylists,
      'errorSetter': setErrorPlaylist
    },
    {
      'url': 'categories',
      'key': 'categories',
      'dataSetter': setCategories,
      'errorSetter': setErrorCategory
    }
    ];

  useEffect(() => {
    endPoints.forEach(endPoint => {
      setLoading(true);
      api(endPoint.url)
      .then(data => data[endPoint.key].items)
      .then(endPoint.dataSetter)
      .then(() => setLoading(false))
      .catch(endPoint.errorSetter)
    })
  }, []);
    
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
