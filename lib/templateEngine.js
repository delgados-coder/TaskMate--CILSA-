const path = require("path");

function templateEngine(views) {
    const templates = {
        defaultLayout: "index",
        layoutsDir: path.join(views, "layouts"),
        partialsDir: [
            path.join(views, "partials"),
        ],
        extname: ".hbs",
    }
    return templates
}

module.exports = { templateEngine }