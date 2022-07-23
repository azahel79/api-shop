const App = require("./App/App");

const app = new App();

app.controllers();
app.middlewares();
app.servidores();
app.conectarDB();
app.listen();