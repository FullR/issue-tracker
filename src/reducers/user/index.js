import actionRouter from "util/action-router";
import request from "superagent";

module.exports = actionRouter({
  loggedIn: false,
  pendingUserCred: null,
  user: null,
  error: null
}, {
  LOGIN:{
    create: (username, password) => (dispatch) => {
      console.log(`Logging in as ${username} ${password}`);
      request
        .post("/api/login")
        .set('Accept', 'application/json')
        .send({username, password})
        .end((error, res) => {
          if(error) {
            console.log("Failed to login:", error);
            dispatch({type: "LOGIN_FAIL", error});
          } else {
            console.log("Logged in!", res);
            dispatch({type: "LOGIN_SUCCESS", user: res.data})
          }
        });
    }
  },

  LOGIN_SUCCESS: {
    create: (user) => ({user}),
    reduce: (state, {user}) => ({
      ...state,
      user,
      loggedIn: true,
      pendingUserCred: null
    })
  },

  LOGIN_FAIL: {
    create: (error) => ({error}),
    reduce: (state, {error}) => ({
      loggedIn: false,
      pendingUserCred: null,
      user: null,
      error
    })
  }
});
