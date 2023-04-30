import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../style";
import { setPosts, setDraftItems } from "../../state";

const PublishWidget = ({ handleClose, canvas, items, fromDraft = null }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post, setPost] = useState(""); // actual post content
  const [title, setTitle] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const deleteDraft = async () => {
    const response = await fetch(`http://localhost:3001/canvases/${fromDraft}/delete`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(
      setDraftItems( { draftItems: null })
    );
    window.location.reload(false);
  };

  const handlePost = async () => {
    var imgUrl = "";
    if (fromDraft == null) {
      const cloudData = new FormData();
      var uri = canvas.current.toDataURL();
      cloudData.append("file", uri);
      cloudData.append("upload_preset", "wearapp");
      cloudData.append("cloud_name", "dpclhozin");
      await fetch(" https://api.cloudinary.com/v1_1/dpclhozin/image/upload", {
        method: "post",
        body: cloudData,
      })
        .then((resp) => resp.json())
        .then((data) => {
          imgUrl = data.url;
        })
        .catch((err) => console.log(err));
    } else {
      imgUrl = canvas;
    }
    const response = await fetch(`http://localhost:3001/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        userId: _id,
        title: title,
        description: post,
        canvasPicture: imgUrl,
        items: items.filter((item) => item.id !== 'upload'),
        isPost: true,
      }),
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setPost(""); // reset all the state after calling api
    setTitle("");
    if(fromDraft!=null) {await deleteDraft();}
    else  {navigate(`/profile/${_id}`);}
  };

  return (
    <div className={`${styles.publishWidget}`}>
      <div>
        <label for="title" className={`${styles.logLabel}`}>
          title
        </label>
        <input
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={`${styles.logInput}`}
          name="title"
        />
      </div>

      <div>
        <label for="description" className={`${styles.logLabel}`}>
          description
        </label>
        <textarea
          onChange={(e) => setPost(e.target.value)}
          value={post}
          rows={2}
          className={`${styles.logInput}`}
          name="description"
        />
      </div>

      <div className="flex flex-row justify-between">
        <button
          onClick={handleClose}
          className={`${styles.publishCancelButon} font-josefin`}
        >
          cancel
        </button>
        <button
          onClick={handlePost}
          className={`${styles.publishButon} font-josefin`}
        >
          post
        </button>
      </div>
    </div>
  );
};

export default PublishWidget;
