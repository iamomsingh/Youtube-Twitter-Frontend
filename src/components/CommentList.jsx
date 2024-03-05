import React, { useState, useEffect } from "react";
import { timeAgo } from "../helpers/time";
import { useSelector, useDispatch } from "react-redux";
import { editAComment, getVideoComments } from "../store/Slices/commentSlice";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { deleteAComment } from "../store/Slices/commentSlice";
import { DeleteConfirmation, Edit, Like } from "./index";
import { Link } from "react-router-dom";

const CommentList = ({
  avatar,
  userName,
  createdAt,
  content,
  commentId,
  isLiked,
  likesCount,
}) => {
  const avatar2 = useSelector((state) => state.auth?.userData?.avatar.url);
  const authUserName = useSelector((state) => state.auth?.userData?.userName);
  const dispatch = useDispatch();

  const [editState, setEditState] = useState({
    editing: false,
    editedContent: content,
    isOpen: false,
    delete: false,
  });

  const handleEditComment = (editedContent) => {
    dispatch(editAComment({ commentId, content: editedContent }));
    setEditState((prevState) => ({
      ...prevState,
      editing: false,
      editedContent,
      isOpen: false,
      delete: false,
    }));
  };

  const handleDeleteComment = () => {
    dispatch(deleteAComment(commentId));
    setEditState((prevState) => ({
      ...prevState,
      delete: false,
    }));
  };

  return (
    <>
      <div className='text-white w-full flex justify-start items-center sm:gap-5 gap-3  p-3 sm:p-5'>
        <div className='w-12'>
          <Link to={`/channel/${userName}/video`}>
            <img
              src={avatar || avatar2}
              className='w-10 h-10 object-cover rounded-full'
            />
          </Link>
        </div>
        <div className='w-full flex flex-col gap-1 relative'>
          <div className='flex items-center gap-2'>
            <Link to={`/channel/${userName}`}>
              <h2 className='text-xs'>@{userName}</h2>
            </Link>
            <span className='text-xs text-slate-400'>{timeAgo(createdAt)}</span>
          </div>
          {authUserName === userName && (
            <div className='right-0 absolute'>
              <div className='relative'>
                <HiOutlineDotsVertical
                  className='text-white cursor-pointer'
                  onClick={() =>
                    setEditState((prevState) => ({
                      ...prevState,
                      isOpen: !prevState.isOpen,
                    }))
                  }
                />

                {editState.isOpen && (
                  <div className='border bg-[#222222] text-lg border-slate-600 absolute text-center left-2 rounded-lg'>
                    <ul>
                      <li
                        className='hover:opacity-50  px-8 cursor-pointer border-b border-slate-600'
                        onClick={() =>
                          setEditState((prevState) => ({
                            ...prevState,
                            editing: !prevState.editing,
                            isOpen: false,
                          }))
                        }
                      >
                        Edit
                      </li>
                      <li
                        className='px-5 hover:opacity-50 cursor-pointer'
                        onClick={() =>
                          setEditState((prevState) => ({
                            ...prevState,
                            delete: true,
                            isOpen: false,
                          }))
                        }
                      >
                        Delete
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Delete Confirm popup */}
          {editState.delete && (
            <DeleteConfirmation
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  delete: false,
                  isOpen: false,
                }))
              }
              onDelete={handleDeleteComment}
              comment={true}
            />
          )}

          {editState.editing ? (
            <Edit
              initialContent={editState.editedContent}
              onCancel={() =>
                setEditState((prevState) => ({
                  ...prevState,
                  editing: false,
                  isOpen: false,
                }))
              }
              onSave={handleEditComment}
            />
          ) : (
            editState.editedContent
          )}

          {/* Like for comments */}
          <Like
            isLiked={isLiked}
            likesCount={likesCount}
            commentId={commentId}
            size={17}
          />
        </div>
      </div>
    </>
  );
};

export default CommentList;
