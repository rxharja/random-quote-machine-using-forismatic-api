var previousQuote = [];

$(function() {
  var author = $("#author");
  var text = $("#quoteText");
  getQuote(author, text);
  
  $("#newQuoteButton").click(function(event){
    event.preventDefault();
    getQuote(author, text);
  })
});

function getQuote(author, text){
  var r = Math.floor(Math.random()*365)-100;
  var g = Math.floor(Math.random()*365)-100;
  var b = Math.floor(Math.random()*365)-100;
  var rgb = "rgb("+r+","+g+","+b+")"; 
  var rgbHover = "rgb("+(r+50)+","+(g+50)+","+(b+50)+")"; 
  $('body').css("background-color",rgb);
  $('button').css("background-color",rgb);
  $('#quoteText').css("color",rgb);
  $('#author').css("color",rgb);
  
 var forismaticURL = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
  
  $.getJSON(forismaticURL, function(data){
    text.html("\""+data.quoteText+"\"");
    if (data.quoteAuthor){
      author.html("- "+ data.quoteAuthor);
      author.attr("href",data.quoteLink);
    }
    else{
      author.removeAttr("href");
      author.html("Anonymous");
    }
    previousQuote.push({text:data.quoteText,author:data.quoteAuthor,color:rgb});
    if (previousQuote.length > 2) {
      previousQuote.splice(0, 1);
    }
    tweet = data.quoteText + " - " + data.quoteAuthor;
  $('#twitterButton').attr("href","https://twitter.com/intent/tweet?text=" + tweet);
  });
 };

$("#previous").click(function(){
  $("#quoteText").html("\""+previousQuote[0].text+"\"");
  $("#author").html("-"+previousQuote[0].author);
  rgb = previousQuote[0].color;
  $('body').css("background-color",rgb);
  $('button').css("background-color",rgb);
  $('#quoteText').css("color",rgb);
  $('#author').css("color",rgb);
})