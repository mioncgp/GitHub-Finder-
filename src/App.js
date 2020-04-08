import React from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import axios from 'axios';
import Search from './components/users/Search';


class App extends React.Component {

  state = {
    users: [],
    loading: false
  }


  // Search Users
  searchUsers = async (text) => {
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data.items);
    this.setState({ users: res.data.items, loading: false })
  }

  // Clear Users
  clearUsers = () => {
      this.setState({ users: [] })
  }


  render() {
    const { users, loading } = this.state;
    return  (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} showClear={this.state.users.length > 0 ? true: false}/>
          <Users users={users} loading={loading}/>
        </div>
      </div>
    );
  }
}

export default App;
