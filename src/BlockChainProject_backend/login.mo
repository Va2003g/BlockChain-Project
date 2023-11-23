import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Error "mo:base/Error";

actor {
  type UserInfo = {
    userName : Text;
    userEmail : Text;
    userPassword : Text;
  };
  type storedUserInfo = {
    userName : Text;
    userEmail : Text;
    userPassword : Text;
  };
  var map = HashMap.HashMap<Text, UserInfo>(0, Text.equal, Text.hash);

  public func signUp(userEmail : Text, Info : UserInfo) : async Text {

    let userInfo : UserInfo = {
      userName = Info.userName;
      userEmail = Info.userEmail;
      userPassword = Info.userPassword;
    };

    map.put(userEmail, userInfo);
    return "user successfully registered";

  };
  public func fetchuser(userEmail : Text) : async UserInfo {

    let data : UserInfo = switch (map.get(userEmail)) {
      case (?value) { value };

      case (null) { throw Error.reject("user is not registered") };
    };
    return data;
  };

  public func login(userEmail : Text, loginInfo : UserInfo) : async Text {
    let storedUserInfo = await fetchuser(userEmail);

    if (Text.equal(loginInfo.userEmail, storedUserInfo.userEmail) and Text.equal(loginInfo.userPassword, storedUserInfo.userPassword)) {
      return "Login success";
    } else {
      throw Error.reject("Invalid user credentials");
    };
  };

  public func updatePassword(userEmail : Text, Info : UserInfo) : async () {

    let userInfo : UserInfo = {
      userName = Info.userName;
      userEmail = Info.userEmail;
      userPassword = Info.userPassword;
    };
    ignore map.replace(userEmail, userInfo);
  };

  public func deleteData(userEmail : Text) : async Text {

    map.delete(userEmail);
    return "user deleted";
  };

};