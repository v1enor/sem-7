using UWSR.Models;

namespace UWSR.Utils
{
    public static class Security
    {
        public static bool CheckIsAdmin(HttpContext context)
        {
            var check = context.Session.Get("isAdmin");
            return check != null;
        }
        public static bool CheckIsCommentUser(HttpContext context, Comment comment)
        {
            return comment.SessionId == context.Session.Id;
        }
    }
}
