
import './App.css';
import React from 'react';
import {Switch,Route,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';


import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component.jsx'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up-component/sign-in-and-sign-up-component'
import CheckoutPage from './pages/checkout/checkout.component';


import Header from './components/header/header.component.jsx'

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import {setCurrentUser} from './redux/user/user.actions';
import {selectCurrentUser} from '../src/redux/user/user.selectors'

// const HatsPage =()=>(
//   <div>
//     <h1>HATS PAGE</h1>
//   </div>
// );

class App extends React.Component {
  // constructor(){
  //   super();
  //   this.state= {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth= null;

  componentDidMount(){
    const {setCurrentUser} = this.props;
  this.unsubscribeFromAuth=  auth.onAuthStateChanged(async userAuth=>{
    if(userAuth){
      const userRef= await createUserProfileDocument(userAuth);

      userRef.onSnapshot(snapShot =>{
      setCurrentUser({
       
          id: snapShot.id,
          ...snapShot.data()
        
      })
      })
    }
    else
    setCurrentUser( userAuth);

  });
  }
componentWillUnmount(){
  this.unsubscribeFromAuth();
}

  render(){
    return (
    <div>
      <Header/>
      <Switch>
        <Route exact path='/' component={Homepage}></Route>
      <Route  path='/shop' component={ShopPage}></Route>
      <Route exact  path='/checkout' component={CheckoutPage}></Route>
      <Route exact path='/signin' 
      render={()=>
      this.props.currentUser ? (
        <Redirect to ='/' />
      ) : (
        <SignInAndSignUpPage></SignInAndSignUpPage>
      )
      }></Route>
     
      </Switch>
      
    </div>
  );
  }
  
}
const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps,mapDispatchToProps)(App);
