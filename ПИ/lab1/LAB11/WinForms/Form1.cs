using System.Collections.Specialized;
using System.Net;
using System.Text;

namespace WinForms
{
    public partial class SummForm : Form
    {
        public SummForm()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private async void reguestButton_Click(object sender, EventArgs e)
        {
            string x = parxTextBox.Text;
            string y = paryTextBox.Text;


            var formContent = new FormUrlEncodedContent(new[]
            {
                new KeyValuePair<string, string>("x", x),
                new KeyValuePair<string, string>("y", y)
            });

            HttpClient client = new HttpClient();

            var res = await client.PostAsync("http://localhost:5000/pia_4", formContent);
            var result = await res.Content.ReadAsStringAsync();
            int result2;
            if (int.TryParse(result, out result2))
            {
                resultTextBox.Text = await res.Content.ReadAsStringAsync();
            }
            else
            {
                resultTextBox.Text = "Не удалось преобращовать в инт";
            }
        }


    }
}