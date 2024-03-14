const express = require('express');
const socketIO = require('socket.io');
const http = require('http');
const multer = require('multer');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');
const taskRouter = require('./routes/taskRoutes');
const productRouter = require('./routes/productRoute');
const categoryRouter = require('./routes/categoryRoutes');
const cartRouter = require('./routes/cartRoute');
const chatRouter = require('./routes/chatRoute');
const fileModel = require('./models/filepath');
const auth = require('./middle/auth');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const server = http.createServer(app);

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const uploads = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/png'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
            cb(new Error('Only jpeg, jpg , png and gif Image allow'));
        }
    }
});

// Rate limiting middleware
// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('uploads')); // Serve uploaded images
 // Apply rate limiting
const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
  
// Apply CORS middleware with options
app.use(cors(corsOptions));

// Socket.IO event listeners
const io = socketIO(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('sendmessage', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });


    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Add event handlers for other Socket.IO events
    // Example: socket.on('chat message', ...)
});


// MongoDB connection
const Server = '127.0.0.1:27017';
const db = 'Ecommerce';
mongoose.connect(`mongodb://${Server}/${db}`)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
app.get('/image/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    res.sendFile(`${__dirname}/image/${imageName}`);
});

// Routes
app.use('/users', userRouter);
app.use('/task', taskRouter);
app.use('/category', categoryRouter);
app.use('/cart', cartRouter);
app.use('/product', productRouter);
app.use('/chat', chatRouter);

// File Upload route
app.post('/upload', auth, uploads.single('img'), (req, res) => {
    const path = req.body.path;

    const saveFile = new fileModel({
        imageName: req.file.filename,
        pathName: `${req.file.destination}/${req.body.path}`,
        userId: req.userId,
        logicalPath: path
    });

    saveFile.save()
        .then(() => {
            res.status(201).json({ saveFile });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ msg: "Failed to save file" });
        });
});

// Get all uploaded files
app.get('/allFile', async (req, res) => {
    try {
        const files = await fileModel.find();
        res.status(200).json(files);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Search for files by logical path
app.get('/search', async (req, res) => {
    const { path } = req.body;
    try {
        const files = await fileModel.find({ logicalPath: path });
        if (!files.length) {
            res.status(404).json({ message: "Files not found" });
        } else {
            res.status(200).json({ message: "Files found", details: files });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
