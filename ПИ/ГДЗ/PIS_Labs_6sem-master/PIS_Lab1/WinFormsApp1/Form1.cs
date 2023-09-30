using System.Xml.Linq;

namespace WinFormsApp1;

public partial class Form1 : Form
{
    public Form1()
    {
        InitializeComponent();
    }

    private void textBox1_TextChanged(object sender, EventArgs e) { }


    async private void button1_Click(object sender, EventArgs e)
    {
        var x = textBox1.Text;
        var y = textBox2.Text;

        // передаем параметры x и y в теле POST-запроса
        var formContent = new FormUrlEncodedContent(new[]
        {
            new KeyValuePair<string, string>("x", x),
            new KeyValuePair<string, string>("y", y)
        });

        HttpClient client = new HttpClient();
        // сам post-запрос; асинхронный, поэтому используем async\await
        var res = await client.PostAsync("https://localhost:44381/4.vad", formContent);
        textBox3.Text = await res.Content.ReadAsStringAsync();
    }
}
