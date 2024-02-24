const express = require('express');
const multer = require('multer')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const productRouter = require('./routes/productRoute');
const categoryRouter = require('./routes/categoryRoutes');
const cartRouter = require('./routes/cartRoute');
const chatRouter = require('./routes/chatRoute');
const user = require('./models/user');


const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.static('uploads'))


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(bodyParser.urlencoded({extended:true}));
const PORT = 5000;
app.use(express.json());


app.use((req, res, next) => {
    console.log("HTTP Method - " + req.method + "URL - " + req.url)
    next();
})



const checkLimit = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message:
        'try again ',
    standardHeaders: true,
    legacyHeaders: false,
})
app.get('/image/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(`${__dirname}/image/${imageName}`);
});
app.use('/category', checkLimit)
app.use('/task', checkLimit)


app.use('/users', userRouter);
app.use('/task', taskRouter);
app.use('/category', categoryRouter);
app.use('/cart',cartRouter);
app.use('/product',productRouter);
app.use('/chat',chatRouter);

app.get('/', (req, res) => {
    res.send('Hello shubham')
})





const fileModel = require('./models/filepath')
const path = require('path');
const auth = require('./middle/auth');




let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,  'uploads')
    },

    filename: (req, file, cb) => {
        cb(null, file.originalname)

    }
})

const uploads = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/png') {
            cb(null, true)
        }
        else {
            cb(null, false);
            cb(new Error('Only jpeg, jpg , png and gif Image allow'))
        }
    }
})

app.get('/hello',(req,res)=>{
    res.send("hello");
})


app.post('/upload', auth, uploads.single('img'), (req, res) => {
    const path = req.body.path

    const saveFile = new fileModel({
        imageName: req.file.filename,
        pathName: `${req.file.destination}\\${req.body.path}`,
        userId: req.userId,
        logicaLPath: path
    });
    try {
        saveFile.save();

        res.status(201).json({ saveFile });
    } catch (error) {

        res.status(400).json({ msg: "not save file" })
    }

})

app.get('/allFile', async (req, res) => {

    try {

        const gatfile = await fileModel.find();

        res.status(200).json(gatfile);

    } catch (err) {

        console.log(err);
        res.status(500).json({ message: "something went wrong " });

    }


})

app.get('/search', async (req, res) => {

    const path = req.body.path
    try {

        const file = await fileModel.find({ logicaLPath:path })
        if (!file.length)
         {
            res.status(200).send({ message: "File not found" })
        }

        else {
            res.status(200).send({ message: "Files", Details: file })
        }


    } catch (error) {
        res.status(500).json({ message: "something went wrong " });
    }
})


const Server = '127.0.0.1:27017'
const db = 'Ecommerce'


mongoose.connect(`mongodb://${Server}/${db}`)

    .then(() => {


        app.listen(PORT, () => {
            console.log('Server is Started.......')

        })

    }).catch((err) => {
        console.log(err);
    })


