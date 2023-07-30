import { useEffect, useRef, useState } from "react";
import "./createPostPopup.css";
import Picker from "emoji-picker-react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";
import PostError from "./PostError";
import AddToYourPost from "./AddToYourPost";
import ImagePreview from "./ImagePreview";
import {uploadImages} from "../../../Services/uploadImages"

import {createPost} from "../../../Services/post"
import PulseLoader from "react-spinners/PulseLoader";
import dataURItoBlob from "../../helpers/dataURItoBlob";

export default function CreatePostPopup({ user, setVisible }) {
  const [text, setText] = useState("");
  const [showPrev, setShowPrev] = useState(false);
  const [images, setImages] = useState([]);
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState("")
  const [background,setBackground]=useState("")

  const postSubmit =async () =>{
    if(background){
      setLoading(true)
      const res = await createPost(null,background,text,null,user.id,user.token)
      setLoading(false)
     
      if(res==="ok"){
         setBackground("")
      setText("")
      setVisible(false)
      }else{
        setError(res)
      }
    }else if(images && images.length){
  console.log(images);

      setLoading(true)
      const postImages = images.map((img) => {
        return dataURItoBlob(img);
      }); 
      const path =`${user.first_name} ${user.last_name} /post Images`
      let formData =  new FormData()
      formData.append("path", path);
      postImages.forEach((image) => {
        formData.append("file", image);
      });
      const response =await uploadImages(formData,path,user.token)
      console.log(response);
      const res = await createPost(
        null,
        null,
        text,
        response,
        user.id,
        user.token
      );
      setLoading(false);
      if (res === "ok") {
        setText("");
        setImages("");
        setVisible(false);
      } else {
        setError(res);
      }
       }else if(text){
      setLoading(true)
      const res = await createPost(null,null,text,null,user.id,user.token)
      setLoading(false)
     
      if(res==="ok"){
         setBackground("")
      setText("")
      setVisible(false)
      }else{
        setError(res)
      }
    }else{
      console.log(",nknxl");
    }

  }
  return (
    <div className="blur">
      <div className="postBox">
        {
          error && <PostError error={error} setError={setError}/>
        }
        <div className="box_header">
          <div 
           className="small_circle"
           onClick={() => {
             setVisible(false);
           }}
          >
            <i className="exit_icon"></i>
          </div>
          <span>Create Post</span>
        </div>
        <div className="box_profile">
          <img src={user.picture} alt="" className="box_profile_img" />
          <div className="box_col">
            <div className="box_profile_name">
              {user.first_name} {user.last_name}
            </div>
            <div className="box_privacy">
              <img src="../../../icons/public.png" alt="" />
              <span>Public</span>
              <i className="arrowDown_icon"></i>
            </div>
          </div>
        </div>

        {!showPrev ? (
          <>
            <EmojiPickerBackgrounds
              text={text}
              user={user}
              setText={setText}
              showPrev={showPrev}
              background={background}
              setBackground={setBackground}
            />
          </>
        ) : (
          <ImagePreview
            text={text}
            user={user}
            setText={setText}
            showPrev={showPrev}
            images={images}
            setImages={setImages}
          />
        )}
        <AddToYourPost setShowPrev={setShowPrev} />
        <button className="post_submit" onClick={()=>{
          postSubmit()
        }}
        disabled={loading}
        >
         {loading ? <PulseLoader color="#fff" size={5} /> : "Post"}
         
          </button>
      </div>
    </div>
  );
}
