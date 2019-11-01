require('dotenv').config();

const micro = require('micro');
const { router, get } = require('micro-fork');
const NewsAPI = require('newsapi');

const newsapi = new NewsAPI(process.env.NEWS_TOKEN);

const fetchNews = async (searchTerm, pageNum) => {
    return await newsapi.v2.everything({
        q: searchTerm,
        language: 'en',
        page: pageNum,
        pageSize: 5,
    });
};

const home = (req, res) => {
    micro.send(
        res,
        200,
        'Type /topic?search=<term> to get result from News API',
    );
};

const fetch = async (req, res) => {
    if (!process.env.NEWS_TOKEN) {
        micro.send(res, 403, 'No NEWS_TOKEN found!');
        return;
    }

    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        const topic = req.query['search'];

        const data = await fetchNews(topic, 1).catch(e => console.log(e));

        micro.send(res, 200, data.articles);
    } catch (e) {
        micro.send(res, 500, e);
    }
};

const notFound = (req, res) => {
    micro.send(res, 404, 'Page not found');
};

const Router = router()(
    get('/', home),
    get('/topic', fetch),
    get('*', notFound),
);

const app = micro(Router);

if (!process.env.IS_NOW) {
    const port = process.env.PORT || 3000;
    app.listen(port);
    console.log(`Micro is serving at ${port}`);
}

module.exports = app;
