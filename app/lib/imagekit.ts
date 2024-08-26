import ImageKit from "imagekit";

const publicKey : string = process.env.IMAGEKIT_PUBLICKEY!;
const privateKey : string = process.env.IMAGEKIT_PRIVATEKEY!;
const urlEndpoint : string =  process.env.IMAGEKIT_URL!;

const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export const uploadImage = (file:Buffer, filename:string, folder:string) => 
    imagekit.upload({
        file : file,
        fileName : filename,
        useUniqueFileName: false,
        folder: `/shoplexify/${folder}/`
    }).then(res=>({imageId:res.fileId, image:res.url}))
    .catch(err=>{console.log(err);console.log(filename)});

// export const deleteFile = async(fileId)=>{
//     await imagekit.deleteFile(fileId);
// };