import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Nat "mo:base/Nat";
import List "mo:base/List";
import Iter "mo:base/Iter";

actor {
  type loginInfo={
    userEmail:Text;
    userPassword:Text;
  };
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

  type CommentInfo = {
    commentText : Text;
    CommentId : Text;
    userEmail : Text;
    likeCount : Nat;
    dislikeCount : Nat;
    userActions : List.List<Text>;
  };
  type Commentget = {
    commentText : Text;
    userEmail : Text;
    userActions : [Text];
  };

  var map = HashMap.HashMap<Text, UserInfo>(0, Text.equal, Text.hash);
  var Comments = HashMap.HashMap<Text, CommentInfo>(0, Text.equal, Text.hash);
  var lastCommentId = 0;

 public func signUp(userEmail : Text, Info : UserInfo) : async Text {
    if (map.get(userEmail) != null) {
      return "User with this email already exists. Please log in instead.";
    };

    let userInfo : UserInfo = {
      userName = Info.userName;
      userEmail = Info.userEmail;
      userPassword = Info.userPassword;
    };

    map.put(userEmail, userInfo);
    return "User successfully registered";
  };
  public func fetchuser(userEmail : Text) : async UserInfo {

    let data : UserInfo = switch (map.get(userEmail)) {
      case (?value) { value };

      case (null) { throw Error.reject("user is not registered") };
    };
    return data;
  };

  public func login(userEmail : Text, loginInfo : loginInfo) : async Text {
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

  public func createComment(info : Commentget) : async Text {
    lastCommentId += 1;
    let uniqueID = Nat.toText(lastCommentId);

    var userActions : List.List<Text> = List.nil<Text>();

    let comment : CommentInfo = {
      commentText = info.commentText;
      CommentId = uniqueID;
      userEmail = info.userEmail;
      likeCount = 0;
      dislikeCount = 0;
      userActions = userActions;
    };

    Comments.put(uniqueID, comment);
    return "Comment successfully created with ID: " # uniqueID;
  };

  public query func getCommentByCommentId(commentId : Text) : async CommentInfo {
    let data = switch (Comments.get(commentId)) {
      case (?value) { value };
      case (null) { throw Error.reject("Comment not exists") };
    };
    return data;
  };

  public func likeComment(commentId : Text, userEmail : Text) : async Text {
    let comment = await getCommentByCommentId(commentId);
    func change(x : Text) : Bool {
      x == userEmail;
    };

    let foundUserEmail = List.find(comment.userActions, change);

    if (foundUserEmail != null) {
      return "You have already liked/disliked this comment";
    } else {
      let updatedLikeCount = comment.likeCount + 1;

      let updatedUserActions = List.push(userEmail, comment.userActions);

      let updatedComment : CommentInfo = {
        commentText = comment.commentText;
        CommentId = comment.CommentId;
        userEmail = comment.userEmail;
        likeCount = updatedLikeCount;
        dislikeCount = comment.dislikeCount;
        userActions = updatedUserActions;
      };

      ignore Comments.replace(commentId, updatedComment);

      return "You have successfully liked the comment";
    };
  };

  public func dislikeComment(commentId : Text, userEmail : Text) : async Text {
    let comment = await getCommentByCommentId(commentId);
    func change(x : Text) : Bool {
      x == userEmail;
    };

    let foundUserEmail = List.find(comment.userActions, change);

    if (foundUserEmail != null) {
      return "You have already disliked/liked this comment";
    } else {
      let updateddisLikeCount = comment.dislikeCount + 1;

      let updatedUserActions = List.push(userEmail, comment.userActions);

      let updatedComment : CommentInfo = {
        commentText = comment.commentText;
        CommentId = comment.CommentId;
        userEmail = comment.userEmail;
        likeCount = comment.likeCount;
        dislikeCount = updateddisLikeCount;
        userActions = updatedUserActions;
      };

      ignore Comments.replace(commentId, updatedComment);

      return "You have successfully disliked the comment";
    };
  };
  
  public func getAllComments() : async [(Text, CommentInfo)] {
    let commentIter : Iter.Iter<(Text, CommentInfo)> = Comments.entries();
    let commentArray : [(Text, CommentInfo)] = Iter.toArray(commentIter);
    commentArray;
  };

};