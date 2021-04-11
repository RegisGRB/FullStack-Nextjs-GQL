import React from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import code from "@editorjs/code";
import image from "@editorjs/image";
import paragraph from "@editorjs/paragraph";
import link from "@editorjs/link";
import quote from "@editorjs/quote";
import delimiter from "@editorjs/delimiter";
const Editor = ({ admin = false, data }) => {
 const [editor,seteditor] = React.useState();

  React.useEffect(()=>{
    if(editor){   
      editor.clear();
      editor.render(data);
    }
  },[data])

  
  React.useEffect(()=>{
    if(editor){   
      editor.destroy();
      setEditor();
    }
  },[admin])

  React.useEffect(()=>{
    setEditor();
  },[]);

const setEditor = () =>{
  seteditor(new EditorJS({
    holder: "editorjs",
    autofocus: true,
    tools: {
      header: {
        class: Header,
        inlineToolbar: ["link"],
      },
      list: {
        class: List,
        inlineToolbar: true,
      },
      code: {
        class: code,
        inlineToolbar: true,
      },
      image: {
        class: image,
        inlineToolbar: true,
      },
      paragraph: {
        class: paragraph,
        inlineToolbar: true,
      },
      link: {
        class: link,
      },
      quote: {
        class: quote,
        inlineToolbar: true,
      },
      delimiter: {
        class: delimiter,
        inlineToolbar: true,
      },
    },
    readOnly: !admin,
    data:data
  }));
}



  return <div id="editorjs" className={admin ? "editMode" : ""}></div>;
};


export default Editor;
