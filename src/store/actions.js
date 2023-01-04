import {
  ADD_COMMENT,
  ADD_POST,
  LOAD_COMMENTS,
  LOAD_POSTS,
  REMOVE_POST,
} from "./types";
import { database } from "../config";
import { child, get, ref, remove, set, update, push } from "firebase/database";
import Comments from "../components/Comments";

export function startAddingPost(post) {
  return (dispatch) => {
    // return database
    //   .ref("posts")
    //   .update({ [post.id]: post })
    //   .then(() => {
    //     dispatch(addPost(post));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    return update(ref(database, "posts/"), {
      [post.id]: post,
    })
      .then(() => {
        dispatch(addPost(post));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function startloadingPost() {
  return (dispatch) => {
    return get(child(ref(database, "posts/"), "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let posts = [];
          snapshot.forEach((childSnapShot) => {
            posts.push(childSnapShot.val());
          });
          dispatch(loadData(posts));
          console.log(posts);
        } else {
          console.log("no data");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function startRemovePost(index, id) {
  return (dispatch) => {
    return remove(ref(database, `posts/${id}`))
      .then(() => {
        dispatch(removePost(index));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function startAddComment(comment, postId) {
  return (dispatch) => {
    return push(ref(database, `comments/${postId}`), comment)
      .then(() => {
        dispatch(addComment(comment, postId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function startLoadingComments() {
  return (dispatch) => {
    return get(child(ref(database, "comments/"), "/")).then((snapshot) => {
      if (snapshot.exists()) {
        let comments = {};
        snapshot.forEach((childSnapShot) => {
          comments[childSnapShot.key] = Object.values(childSnapShot.val());
        });
        dispatch(loadComments(comments));
      }
    });
  };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function removePost(index) {
  return {
    type: REMOVE_POST,
    index,
  };
}

export function addComment(comment, postId) {
  return {
    type: ADD_COMMENT,
    comment,
    postId,
  };
}

export function loadData(post) {
  return {
    type: LOAD_POSTS,
    post,
  };
}
export function loadComments(comments) {
  return {
    type: LOAD_COMMENTS,
    comments,
  };
}
