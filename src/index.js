const express = require("express")
const session = require("express-session");
const path = require("path")
const app = express()
// const hbs = require("hbs")
const LogInCollection = require("./mongo")
const port = process.env.PORT || 3000
app.use(express.json())

app.use(express.urlencoded({ extended: false }))

const tempelatePath = path.join(__dirname, '../tempelates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
app.set('views', tempelatePath)
app.use(express.static(publicPath))


// hbs.registerPartials(partialPath)

 app.get('/', (req, res) => {
     res.render('home')
 })

app.get('/signup', (req, res) => {
    res.render('signup')
})
app.get('/login', (req, res) => {
    res.render('login')
})




app.post('/signup', async (req, res) => {
    
    const data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }

    try {
        const checking = await LogInCollection.findOne({ name: req.body.name });

        if (checking && checking.name === req.body.name) {
            return res.send("User with this name already exists.");
        }

        await LogInCollection.create(data);
        res.status(201).render("home2", {
            naming: req.body.name
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.send("Signup failed. Please try again.");
    }
});

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name });

        if (!check) {
            return res.send("User not found. Please sign up.");
        }

        if (check.password === req.body.password) {
            res.status(201).render("home2", { naming: `${req.body.name}` });
        } else {
            res.send("Incorrect password");
        }

    } catch (e) {
        console.error("Login Error:", e);
        res.send("Login failed. Please try again.");
    }
})

app.get('/home', (req, res) => {
    // Check if the user is authenticated
    const isLoggedIn = req.cookies.loggedIn === 'true'; // Assuming you used cookies
    
    // Render different content based on authentication status
    if (isLoggedIn) {
        res.render('home2', {
            naming: req.body.name
        }); // Render a different template for logged-in users
    } else {
        res.render('home');
    }
});

app.get('/home2', (req, res) => {
    res.render('home', {
        naming: req.query.naming // passing naming as query parameter
    });
});

app.get('/cogni', (req, res) => {
    console.log('Accessing /cogni route');  // Debugging line
    res.render('cogni');
});

app.listen(port, () => {
    console.log('port connected');
})