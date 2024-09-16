const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(express.urlencoded({ extended: true }));

app.get('/dist/src-sw.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/src-sw.js'));
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });

// require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));
