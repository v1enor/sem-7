using System.IO;
using System.Web.Mvc;

namespace PIS_Lab5a.Controllers
{
    public class CResearchController : Controller
    {
        public string C01()
        {
            var request = HttpContext.Request;
            var method = request.HttpMethod;
            var queryParameters = request.QueryString.ToString();
            var uri = request.Url.AbsoluteUri;
            var headers = request.Headers.ToString();
            var body = "";

            if (method == "POST")
                using (var reader = new StreamReader(request.InputStream))
                    body = reader.ReadToEnd();

            var response = string.Format("Метод запроса: {0}<br>" +
                                          "Query-параметры: {1}<br>" +
                                          "URI: {2}<br>" +
                                          "Заголовки: {3}<br>" +
                                          "Тело запроса: {4}", method, queryParameters, uri, headers, body);
            return response;
        }


        public string C02()
        {
            var request = HttpContext.Request;
            var response = HttpContext.Response;
            var method = request.HttpMethod;
            var statusCode = response.StatusCode;
            var statusMessage = response.Status;
            var headers = response.Headers;
            var body = "";

            if (method == "POST")
                using (var reader = new StreamReader(request.InputStream))
                    body = reader.ReadToEnd();


            return $"Код ответа: {statusCode}<br>Сообщение ответа: {statusMessage}<br>Заголовки: {headers}<br>Тело: {body}";
        }
    }
}