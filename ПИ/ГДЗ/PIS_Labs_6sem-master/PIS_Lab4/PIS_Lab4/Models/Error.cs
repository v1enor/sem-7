

namespace PIS_Lab4.Models
{
    public class Error
    {
        public string RequestMethod { get; set; }
        public string RequestUrl { get; set; }
        public string ErrorMessage { get; set; }

        public Error(string requestMethod, string requestUrl, string errorMessage)
        {
            RequestMethod = requestMethod;
            RequestUrl = requestUrl;
            ErrorMessage = errorMessage;
        }
    }
}