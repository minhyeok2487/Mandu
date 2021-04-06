const axios = require('axios')
const cheerio = require('cheerio')

const express = require('express')
const app = express()
const port = 1000

const getHtml = async () => {
    try {
      return await axios.get("https://loawa.com/guild/%EA%BC%AC%EB%A7%88%EB%A7%8C%EB%91%90");
    } catch (error) {
      console.error(error);
    }
};

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/',function(req,res){
    getHtml().then(html => {
        const $ = cheerio.load(html.data);
        let ulList = [];
        const $bodyList = $(".col-6.p-1");
    
        $bodyList.each(function(i, elem) {
          ulList[i] = 
          i+'.'+"\n"+
          $(this).find('.text-theme-0.tfs13').eq(0).text()+"\n"+
          $(this).find('.text-grade4.tfs13').text()+"\n"+
          $(this).find('span.text-grade5.tfs13').text();
        });
        return ulList;
     }).then((ulList)=>{
        ulList.shift();
        res.render('index.html', {data:ulList});
     });
 });

