function handler(event) {
  var request = event.request;
  var path = request.uri || "/";

  // 1. Handle the 301 Redirect first
  if (path === '/llm.txt') {
    return {
      statusCode: 301,
      statusDescription: 'Moved Permanently',
      headers: {
        'location': { value: '/llms.txt' }
      }
    };
  }

  // 2. Your existing Bot Detection / Prerender logic
  var headers = request.headers || {};
  var uaHeader = headers["user-agent"] || headers["User-Agent"];
  var ua = uaHeader ? uaHeader.value.toLowerCase() : "";
  var isBot = /(facebookexternalhit|twitterbot|linkedinbot|slackbot|whatsapp|telegrambot|discordbot|pinterest|googlebot|bingbot)/.test(ua);
  
  if (!isBot) return request;

  if (path.indexOf("?") !== -1) path = path.split("?")[0];
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);

  // Never prerender static files — serve them directly from S3
  var staticFile = /\.(xml|txt|json|ico|png|svg|jpg|jpeg|gif|webp|css|js|woff|woff2)$/i;
  if (staticFile.test(path)) return request;

  var map = {
    "/": "/prerender/home.html",
    "/index": "/prerender/home.html",
    "/index.html": "/prerender/home.html",
    "/faqs": "/prerender/faqs.html",
    "/faqs/index.html": "/prerender/faqs.html",
    "/userguide": "/prerender/userguide.html",
    "/userguide/index.html": "/prerender/userguide.html"
  };

  request.uri = map[path] || "/prerender/default.html";
  request.headers["cache-control"] = { value: "public,max-age=3600" };
  return request;
}
