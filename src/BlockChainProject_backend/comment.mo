import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Error "mo:base/Error";
import Nat "mo:base/Nat";
import List "mo:base/List";
import Iter "mo:base/Iter";

actor {
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

  var Comments = HashMap.HashMap<Text, CommentInfo>(0, Text.equal, Text.hash);
  var lastCommentId = 0;

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
    return "Comment successfully created";
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