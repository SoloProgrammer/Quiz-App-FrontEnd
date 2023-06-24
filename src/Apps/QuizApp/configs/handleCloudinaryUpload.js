import { showToast } from "./Toast";
import toast from 'react-hot-toast'
export const handleCloudinaryUpload = async (e, setLoading) => {
    let pics = e.target.files[0]
    
    const cloudinaryData = {
        url: "https://api.cloudinary.com/v1_1/dvzjzf36i/image/upload",
        presetName: "quiz-app",
        cloudName: "dvzjzf36i"
    }

    if (pics === undefined) {
        showToast("Not Selected", "Please select an Image file", "warning", 3000)
        return null
    }
    if (pics.type === 'image/jpeg' || pics.type === 'image/png' || pics.type === 'image/jpg' || pics.type === 'image/gif') {

        if (Math.round(pics.size / 1024) < 5120) {
            setLoading(true);
            let toastId;
            toastId = showToast('loading', "Please wait we are uploading your avatar to cloud")
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', cloudinaryData.presetName);
            data.append('cloud_name', cloudinaryData.cloudName);

            const CLOUDINARY_URL = cloudinaryData.url
            let config = {
                method: "POST",
                body: data
            }
            try {
                let res = await fetch(CLOUDINARY_URL, config)
                let json = await res.json();
                setLoading(false);
                toast.dismiss(toastId)
                return json.url.toString();

            } catch (error) {
                setLoading(false)
                showToast("error", "Some error occured try again later", 3000)
            }

        }
        else {
            showToast("error", "Image should be less than 5mb", 3000)
        }
    }
    else {
        showToast("warning", "Please select an Image file", 3000)
    }

}