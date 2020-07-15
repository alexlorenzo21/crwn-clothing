import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Checkout from "./pages/checkout/checkout.component";

import Header from "./components/header/header.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { setCurrentUser } from "./redux/user/user.actions";
import { selectCurrentUser } from "./redux/user/user.selectors";
import CheckoutPage from "./pages/checkout/checkout.component";

/* Need to set up google authentication signin and 
have our application listen to authentication state changes using React Hooks */

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });

          console.log(this.state);
        });
      }

      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />

          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

/* const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const unsubscribeFromAuth = null;
  //similar to componentDidMount() using Hook

  useEffect(() => {
    //called only once

    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // I got this to work. NOTE: you can't console log a variable within
        //useEffect after updating it, it has to be done outside of it.

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        setCurrentUser({
          currentUser: userAuth,
        });
      }
    });
  }, []);

  console.log(currentUser);

  //similar to componentWillUnmount() using Hook
  useEffect(() => {
    const unsubscribeFromAuth = null;
    return () => {
      //called before unmounting
      console.log("i am unsubscribing");
      unsubscribeFromAuth();
      console.log("i have unsubscribed");
    };
  }, [unsubscribeFromAuth]);
 */

/* This is as a functional component


const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const unsubscribeFromAuth = null;
  //similar to componentDidMount() using Hook

  useEffect(() => {
    //called only once

    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        // I got this to work. NOTE: you can't console log a variable within
        //useEffect after updating it, it has to be done outside of it.

        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      } else {
        setCurrentUser({
          currentUser: userAuth,
        });
      }
    });
  }, []);

  console.log(currentUser);

  //similar to componentWillUnmount() using Hook
  useEffect(() => {
    const unsubscribeFromAuth = null;
    return () => {
      //called before unmounting
      console.log("i am unsubscribing");
      unsubscribeFromAuth();
      console.log("i have unsubscribed");
    };
  }, [unsubscribeFromAuth]);

  return (
    <div>
      <Header currentUser={currentUser} />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route path="/signin" component={SignInAndSignUp} />
      </Switch>
    </div>
  );
};


export default App;

*/
