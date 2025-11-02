import multer from 'multer'

let storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cd(null,'./public')
  },
  filename:(req,file,cb)=>{
    cb(null,file.originalname)
  }
});

let upload=multer({storage})

export default upload;