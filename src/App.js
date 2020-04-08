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

  async componentDidMount() {
    console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
    this.setState({ loading: true })
    const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    console.log(res.data);
    this.setState({ users: res.data, loading: false })
  }

  render() {
    const { users, loading } = this.state;
    return  (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search />
          <Users users={users} loading={loading}/>
        </div>
      </div>
    );
  }
}

export default App;
