
import './App.css';
import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-component/sign-in-and-sign-up-component'
import Header from './components/header/header.component.jsx'

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

const HatsPage =()=>(
  <div>
    <h1>HATS PAGE</h1>
  </div>
);

class App extends React.Component {
  constructor(){
    super();
    this.state= {
      currentUser: null
    }
  }

  unsubscribeFromAuth= null;

  componentDidMount(){
  this.unsubscribeFromAuth=  auth.onAuthStateChanged(async userAuth=>{
    if(userAuth){
      const userRef= await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot =>{
      this.setState({
        currentUser: {
          id: snapShot.id,
          ...snapShot.data()
        }
      })
      console.log(this.state);
      })
    }
    else
    this.setState({currentUser: userAuth});

  });
  }
componentWillUnmount(){
  this.unsubscribeFromAuth();
}

  render(){
    return (
    <div>
      <Header currentUser={this.state.currentUser}/>
      <Switch>
        <Route exact path='/' component={Homepage}></Route>
      <Route  path='/shop' component={ShopPage}></Route>
      <Route  path='/signin' component={SignInAndSignUpPage}></Route>
     
      </Switch>
      
    </div>
  );
  }
  
}

export default App;
