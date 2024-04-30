const express = require('express');
const mongoose = require('mongoose');
const shortUrl = require('./shortUrls');
const qr = require('qrcode');
const cors = require('cors');
const app = express();

(async () => {
    try {
        await mongoose.connect('mongodb+srv://lolade:ololade@cluster1.rnmpgvz.mongodb.net/', {
            //useNewUrlParser: true,
            //useUnifiedTopology: true 
            connectTimeoutMS: 30000,
            socketTimeoutMS: 30000
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB:', error);
    }
})();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const shortUrls = await shortUrl.find(); 
        const qrCodes = await Promise.all(shortUrls.map(url => qr.toDataURL(url.full)));
        res.render('index', { shortUrls, qrCodes });
    } catch (error) {
        console.error('Error fetching short URLs:', error);
        res.status(500).send('Internal Server Error');
    }
});





// app.post('/shortUrls', async (req, res) => {
//     try {
//         const { fullUrl, customSlug } = req.body;

       
//         if (customSlug && customSlug.trim() !== '') {
//             const existingUrl = await shortUrl.findOne({ customSlug });
//             if (existingUrl) {
//                 return res.status(400).send('Custom slug is already in use');
//             }

          
//             await shortUrl.create({ full: fullUrl, customSlug });
//         } else {
          
//             await shortUrl.create({ full: fullUrl });
//         }

//         res.redirect('/');
//     } catch (error) {
//         console.error('Error creating short URL:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });




// 
app.post('/shortUrls', async (req, res) => {
    try {
        let { fullUrl, customDomain, customSlug } = req.body;
        
        if (!customSlug) {
            customSlug = shortUUID.generate();
        }

        
        let short;
        if (customDomain && customSlug) {
            short = `${customDomain}/${customSlug}`;
        } else if (customSlug) {
            short = `${req.hostname}/${customSlug}`;
        } else {
            short = `${req.hostname}/${shortUUID.generate()}`;
        }

        // Create the short URL
        await shortUrl.create({ full: fullUrl, short, customDomain, customSlug });
        
        
        res.redirect('/');
    } catch (error) {
        console.error('Error creating short URL:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.get('/:shortUrl', async (req, res) => {
    try {
        const foundShortUrl = await shortUrl.findOne({ short: req.params.shortUrl });
        if (!foundShortUrl) return res.sendStatus(404);

        foundShortUrl.clicks++;
        await foundShortUrl.save();

        res.redirect(foundShortUrl.full);
    } catch (error) {
        console.error('Error redirecting:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(8080, function () {
    console.log('Server is running on Port 8080');
});
