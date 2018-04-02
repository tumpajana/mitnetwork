import { createStore } from "redux";
import base64Img from 'base64-img';
import placegholderimg from './Images/avatar.png';

//convert image to base 64
function getImage(src) {
    return new Promise(function (resolve, reject) {
        if (src.includes("base64") && src.includes("image/") && src.includes("data:")) {
            resolve(src);
        } else {
            base64Img.requestBase64(src, function (err, res, body) {
                if (!err) {
                    resolve(body);
                } else {
                    reject(err);
                }
            });
        }
    });
}

const Data_Store = createStore((state, action) => {
    switch (action.type) {
        case 'ProfileData':
            sessionStorage.setItem("user", JSON.stringify(action.value));
            let imageSrc = "";
            if (action.value.imageId) {
                imageSrc = "http://mitapi.memeinfotech.com:5000/file/getImage?imageId=" + action.value.imageId._id;
            } else if (action.value.providerPic) {
                imageSrc = action.value.providerPic;
            } else {
                imageSrc = placegholderimg;
            }

            getImage(imageSrc)
                .then(function (success) {
                    sessionStorage.setItem("avatar", success);
                    return action.value;
                }, function (error) {
                    console.log(error);
                    return action.value;
                });

        case 'LOGGINDATA':
            return action.value;
    }
})

export default Data_Store;