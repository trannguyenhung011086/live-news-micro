require('dotenv').config();
const NewsAPI = require('newsapi');

const micro = require('micro');
const { router, get } = require('micro-fork');
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
    // res.setHeader('Access-Control-Allow-Origin', '*');
    const topic = req.query['search'];

    const data = await fetchNews(topic, 1).catch(e => console.log(e));

    micro.send(res, 200, data.articles);
};

const Router = router()(get('/', home), get('/topic', fetch));

const app = micro(Router);

if (!process.env.IS_NOW) {
    app.listen(process.env.PORT || 3000);
    console.log(`Micro is serving at ${process.env.PORT || 3000}`);
}

module.exports = app;
