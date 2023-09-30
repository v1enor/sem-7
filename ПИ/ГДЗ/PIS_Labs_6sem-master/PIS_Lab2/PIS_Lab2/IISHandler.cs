using System;
using System.Net.WebSockets;
using System.Threading.Tasks;
using System.Web;
using System.Threading;
using System.Text;

namespace PIS_Lab2
{
    public class IISHandler : IHttpHandler
    {
        WebSocket socket;

        public bool IsReusable
        {
            get { return true; }
        }

        public void ProcessRequest(HttpContext context)
        {
            if (context.IsWebSocketRequest)
                context.AcceptWebSocketRequest(WebSocketRequest);
            else
                context.Response.Write("not ws request");
        }
        private async Task WebSocketRequest(WebSocketContext context)
        {
            socket = context.WebSocket;
            string msg = await Receive();
            await Send(msg);
            int i = 0;
            while (true)
            {
                // If socket is being closed on client side, we need to close it on server.
                // Nuance is that no matter what, connection will be closed only after about 1 minute. 
                if (socket.State != WebSocketState.Open)
                {
                    await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "closed by me", CancellationToken.None);
                }
                while (socket.State == WebSocketState.Open)
                {
                    Thread.Sleep(1000);
                    await Send($"[{i++}]");
                }
            }
        }
        private async Task<String> Receive()
        {
            string rc = null;
            var buffer = new ArraySegment<byte>(new byte[512]);
            var result = await socket.ReceiveAsync(buffer, CancellationToken.None);
            rc = Encoding.UTF8.GetString(buffer.Array, 0, result.Count);
            return rc;
        }
        private async Task Send(string message)
        {
            var sendBuffer = new ArraySegment<byte>(Encoding.UTF8.GetBytes($"Ответ: {message}"));
            await socket.SendAsync(sendBuffer, WebSocketMessageType.Text, true, CancellationToken.None);
        }
    }
}
