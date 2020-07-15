# Issues

The componentDidMount use effect on the App.js is not console loggin currentUser Video #89 'Storing User Data in our app'

//similar to componentDidMount() using Hook
useEffect(() => {
//called only once
auth.onAuthStateChanged(async (userAuth) => {
if (userAuth) {
const userRef = await createUserProfileDocument(userAuth);
//\*_\*\* _/ This part isn't working I don't think
userRef.onSnapshot((snapShot) => {
setCurrentUser({
id: snapShot.id,
...snapShot.data(),
});
});
} else {
setCurrentUser(userAuth);
}
setCurrentUser(userAuth);
});
}, []);

SOLVED ^^^ console.log outside of the useEffect

# Questions for Antho

1.  I can't get the Sign out auth.signout feature to work. Header stays saying 'SIGN OUT' even after currentUser has been assigned a value of null. - RESOLVED

2.  Explain to me why I can't replicate destructuring with functional component in the handleChange function. (UPDATE: I was able to do it?) - RESOLVED

    - example:
      handleChange = event => {
      const {name, value} = event.target;
      this.setState({[name]: value});};
    - What worked is as follows (Don't understand how it works) -
      const handleChange = (mySetFunction, event) => {
      const value = event.currentTarget.value;
      mySetFunction(value);
      };

3.  Completely lost it when trying to use react redux hooks or redux within functional components. Ended up removing them because the project primarily used Redux. I will incorporate the redux hooks later on

4.  main Issue is regarding the sign in unmount hook. It doesn't seem to be actually making currentUser null because it is still an object.

5.  Ask about setting me up on GitHub to push commits.
6.  After setting up GitHub, help me push to Heroku via CLI
