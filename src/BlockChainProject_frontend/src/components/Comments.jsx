import React, { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BlockChainProject_backend } from '../../../declarations/BlockChainProject_backend/index';
import { getCookie } from './Helper'; 

export default function UserPost() {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  
  const userEmail = getCookie('userEmail'); 

  const fetchComments = useCallback(async () => {
    try {
      const commentsResult = await finalproject_backend.getAllComments();
      console.log("comments:", commentsResult);

      
      const flattenedComments = commentsResult.flatMap(([commentId, commentDetails]) => ({
        commentId,
        ...commentDetails,
      }));
      console.log(flattenedComments);

      setComments(flattenedComments);
    } catch (error) {
      console.error("Fetching comments failed:", error);
      toast.error("Failed to fetch comments.");
    }
  }, []);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    console.log(userEmail);

    try {
      const userActions = []; 
      const commentsResult = await finalproject_backend.createComment({
        userEmail: userEmail,
        commentText: commentText,
        userActions: userActions,
      });

      if (commentsResult === "Comment successfully created") {
        toast.success('Comment posted successfully!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        fetchComments();
        setCommentText('');
      } else {
        toast.error('Error posting comment!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Error posting comment!', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleLike = async (commentId) => {
    // Implement like comment logic here
  };

  const handleDislike = async (commentId) => {
    // Implement dislike comment logic here
  };

  return (
    <div>
      <ToastContainer />
      <div className="container mx-auto p-4 bg-gray-100">
        <div className="flex justify-center">
          <div className="w-full md:w-6/12">
            <div className="bg-gray-100 shadow-md rounded-lg p-4">
              <form className="flex flex-col space-y-2" onSubmit={handlePostComment}>
                <textarea
                  placeholder="Write your comment here!"
                  className="form-control resize-none border rounded-lg p-2"
                  name="comment"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></textarea>

                <div className="flex justify-center mx-2 my-4">
                  <button className="btn btn-primary" type="submit">
                    Post Comment
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-4">
              {comments.map((comment) => (
                <div key={comment.commentId} className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <div className="flex space-x-2">
                    <div className="w-8 h-8 p-auto rounded-full g-gray-300">
                      <button onClick={() => handleLike(comment.commentId)}>
                        Like
                      </button>
                      <p>{comment.likeCount}</p>
                    </div>
                    <div className="flex-grow">
                      <p>{comment.commentText}</p>
                      <p className="text-sm text-gray-500">By: {comment.userEmail}</p>
                    </div>
                    <div className="w-8 h-8 p-auto rounded-full g-gray-300">
                      <button onClick={() => handleDislike(comment.commentId)}>
                        Dislike
                      </button>
                      <p>{comment.dislikeCount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}