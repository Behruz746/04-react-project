import './App.css';
import React from 'react';
import { useState } from 'react';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = useState([]);
  const [invites, setInvites] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  React.useEffect(()=> {
    fetch("https://reqres.in/api/users").then((res)=> res.json()).then((json)=> {
      // console.log(json.data[0].first_name);
      setUsers(json.data);
    }).catch((err)=> {
      console.warn(err);
      alert("Error: 404");
    }).finally(()=> setLoading(false));
  }, []);

  const onChangeSearchValue = (event)=> {
    setSearchValue(event.target.value);
  };

  const onClickInvite = (id)=> {
    if(invites.includes(id)) {
      setInvites(prev=> prev.filter(_id=> _id !== id));
    } else {
      setInvites(prev => [...prev, id]);
    }
  };

  const onclickSendInvates = ()=> {
    setSuccess(true);
  };

  return (
    <div className="App">

      {
        success ? ( <Success count={invites.length} />
        ) : (
          <Users
            onClickInvite={onClickInvite}
            invites={invites}
            onChangeSearchValue={onChangeSearchValue}
            searchValue={searchValue}
            items={users}
            isLoading={isLoading}
            usersData={users} 
            onclickSendInvates={onclickSendInvates}
          />
        )
      }
    </div>
  );
}

export default App;
