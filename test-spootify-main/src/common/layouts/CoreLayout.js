import React, {useState, useEffect} from 'react';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Player from '../components/Player';

function CoreLayout({ api, children , history }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const settings = {
    headers: {'Authorization': 'Bearer ' + 'xxx'}
  }
  
    useEffect(() => {
      setLoading(true);
      fetch(`${api.baseUrl}/browse/new-releases`, settings)
      .then(response => response.json())
      .then(setData)
      .then(() => setLoading(false))
      .catch(setError)
    }, [])
  
    if(loading){
      return(<h1>Loading...</h1>)
    }
    if(error){
      return(<pre>{JSON.stringify(error, null, 2)}</pre>)
    }
    if(!data){
      return null;
    }
    console.log(data);

  return (
    <div className="main">
      <SideBar />
      <div className="main__content">
        <Header history={history} />
        <div className="main__content__child">
          {children}
        </div>
      </div>
      <Player />
    </div>
  );
}

export default CoreLayout;
