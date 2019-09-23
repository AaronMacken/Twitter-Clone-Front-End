import React, { Component } from "react";


export default class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      userName: "",
      password: "",
      profileImageUrl: ""
    };
  }


  handleSubmit = e => {
    e.preventDefault();
    // if the auth form rendered contains the signUp prop, set authType to signup, otherwise, signin
    const authType = this.props.signUp ? "signup" : "signin";
    this.props.onAuth(authType, this.state).then(() => {
      // once logged in use react router to redirect
      this.props.history.push("/");
    })
    .catch(() => {
      return;
    });
  }


  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { email, userName, password } = this.state;
    const { heading, buttonText, signUp, errors, history,  removeError } = this.props;

    // listen for a change in the route, if so -> use remove Error
    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>

              {/* if errors has a message value, return this div */}
             
              {errors.message && (
                <div className="alert alert-danger">{errors.message}</div>
              )}

              {/* EMAIL */}
              <label htmlFor="email">Email: </label>
              <input
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                value={email}
                type="text"
              ></input>

                {/* PASSWORD */}
              <label htmlFor="password">Password: </label>
              <input
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                type="password"
              ></input>

              {/* IF COMPONENT IS LOADED WITH A SIGN UP PROP - RENDER ADDITIONAL FIELDS */}
              {signUp && (
                <div>
                    {/* USERNAME */}
                  <label htmlFor="userName">Username: </label>
                  <input
                    className="form-control"
                    id="userName"
                    name="userName"
                    onChange={this.handleChange}
                    value={userName}
                    type="text"
                  ></input>

                  {/* PROFILE IMAGE URL */}
                  <label htmlFor="image-url">Image URL: </label>
                  <input
                    className="form-control"
                    id="image-url"
                    name="profileImageUrl"
                    onChange={this.handleChange}
                    type="password"
                  ></input>
                </div>
              )}
              <button className="btn btn-primary btn-block btn-lg" type="submit">{buttonText}</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
