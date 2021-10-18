import signInReducer, {
    login,
    logout,
  } from './loginSlice';

  
  describe('list reducer', () => {
    const initialState = {
        login:false,
        username:"",
        errorMessage:""
    };
    it('should handle initial state', () => {
      expect(signInReducer(undefined, { type: 'unknown' })).toEqual({
        login:false,
        username:"",
        errorMessage:""
      });
    });
  
    it('should handle rejecting wrong username/password', () => {
      const actual = signInReducer(initialState, login({username:"wrong username", password:"wrong password"}));
      expect(actual.login).toEqual(false);
      expect(actual.username).toEqual("");
      expect(actual.errorMessage).toEqual("Wrong username or Password");
    });
  
    it('should handle login in with correct username and password', () => {
      const actual = signInReducer(initialState, login({username:"admin", password:"admin123"}));
      expect(actual.login).toEqual(true);
      expect(actual.username).toEqual("admin");
      expect(actual.errorMessage).toEqual("");
    });
  
    it('should handle loging out', () => {
      const actual = signInReducer(initialState, logout());
      expect(actual.login).toEqual(false);
      expect(actual.username).toEqual("");
      expect(actual.errorMessage).toEqual("");
    });
  
  });
  