import React, {useState} from 'react'
import ReactDom from 'react-dom'
import './modal.scss'
import downloadgif from '../assets/downloadingfile.gif'
import uploadgif from '../assets/uploadingfile.gif'

export default function Modal ({onClose, download, filename, is_download, upload, loadingState}) {
    var [privateKey,setPrivateKey]=useState('')
    var [file,setFile]=useState(null)
    var form;
    if(is_download){
        form = <>
            <form onSubmit={(e)=>download(e,privateKey)}>
                    <input onChange={(e)=>{
                        setPrivateKey(e.target.value)
                    }} type="password" placeholder="Your private key"/>
                    <button type="submit">Download</button>
                </form>
        </>
    }
    else{
        form = <>
            <form onSubmit={(e)=>upload(e,privateKey,file)}>
                    <input type="file" id="fileUpload" onChange={(e)=>{
                        setFile(e.target.files[0])
                    }}/>
                    <input onChange={(e)=>{
                        setPrivateKey(e.target.value)
                    }} type="password" placeholder="Your private key"/>
                    <button type="submit">Upload</button>
                </form>
        </>
    }

    return ReactDom.createPortal(
    <>
    <div id="modal-container">
        <div className="modal-background">
            <div className="modal">
                {loadingState ? 
                <>
                <h2>{is_download ? "Downloading..." : "Uploading..."}</h2>
                <img src={is_download?downloadgif:uploadgif} style={{borderRadius:"10px", width:"300px"}}/>
                </>
                :
                <>
                <h2>{is_download?"Download "+filename:"Upload File"}</h2>
                {form}
                
                <button onClick={onClose}>Cancel</button>
                </>
                }
                
                <svg className="modal-svg" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="none">
				<rect x="0" y="0" fill="none" width="400" height="400" rx="3" ry="3"></rect>
				</svg>
            </div>
        </div>
    </div>
    </>,
    document.getElementById('portal')
    )
}