const data = {
    message: "API is up and running"
 }

exports.onLoad = (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
};
