const express = require('express');
const exphbs = require('express-handlebars');

const app = express();
app.use(express.json());


app.engine('handlebars', exphbs.engine({
    defaultLayout: 'main',
    helpers: {
        formatDate: function (date) {
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: '2-digit'
            });
        },
        isAvailable: (available) => available ? "✅ Yes" : "❌ No",
    }
}));

app.set('view engine', 'handlebars');

let products = [
    { id: 1, name: "Laptop", price: 873.99, available: true, dateAdded: new Date(2025, 3, 1) },
    { id: 2, name: "Smartphone", price: 699.68, available: false, dateAdded: new Date(2025, 2, 15) },
    { id: 3, name: "Headphones", price: 199.99, available: true, dateAdded: new Date(2025, 3, 10) },
];

// Route for rendering the webpage
app.get('/', (req, res) => {
    //res.render('index');
    res.render('Products', {
        title: 'Products',
        products: products
    })
});

// Routes for API
app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
});

app.post('/products', (req, res) => {
    const { name, price, available, dateAdded } = req.body;
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;

    const newProduct = {
        id: newId,
        name,
        price: parseFloat(price),
        available: available === 'true',
        dateAdded: new Date(dateAdded)
    };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
    const { name, price, available, dateAdded } = req.body;
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }
    product.name = name || product.name;
    product.price = price ? parseFloat(price) : product.price;
    product.available = available !== undefined ? available === 'true' : product.available;
    product.dateAdded = dateAdded || product.dateAdded;
    res.json(product);
});

app.delete('/products/:id', (req, res) => {
    const index = products.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }
    products.splice(index, 1);
    res.status(204).send();
});


// Folder for static files
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

