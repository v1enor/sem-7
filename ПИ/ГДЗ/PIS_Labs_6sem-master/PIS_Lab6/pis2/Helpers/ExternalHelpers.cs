using System;
using System.Web.Mvc;


namespace pis2.Helpers
{
    public static class ExternalHelpers
    {
        public static string FormatBirthdate(DateTime date, string format = "dd.MM.yyyy")
        {
            return date.ToString(format);
        }


        public static MvcHtmlString SomeHtmlShit() 
        {
            var form = new TagBuilder("form");
            form.Attributes.Add("method", "post");
            form.Attributes.Add("action", "/TD/AddSave");

            var input = new TagBuilder("input");
            input.Attributes.Add("type", "text");
            input.Attributes.Add("name", "phoneNumber");
            input.Attributes.Add("placeholder", "Phone number");

            var input2 = new TagBuilder("input");
            input2.Attributes.Add("type", "text");
            input2.Attributes.Add("name", "ownerName");
            input2.Attributes.Add("placeholder", "Owner name");

            var button = new TagBuilder("button");
            button.Attributes.Add("type", "submit");
            button.SetInnerText("Add");

            form.InnerHtml += input.ToString();
            form.InnerHtml += input2.ToString();
            form.InnerHtml += button.ToString();

            return new MvcHtmlString(form.ToString());
        }
    }
}