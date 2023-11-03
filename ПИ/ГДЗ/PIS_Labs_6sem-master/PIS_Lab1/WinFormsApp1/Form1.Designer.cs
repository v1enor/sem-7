namespace WinFormsApp1;

partial class Form1
{
    /// <summary>
    ///  Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    ///  Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
        if (disposing && (components != null))
        {
            components.Dispose();
        }
        base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    /// <summary>
    ///  Required method for Designer support - do not modify
    ///  the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
        button1 = new Button();
        textBox1 = new TextBox();
        textBox2 = new TextBox();
        textBox3 = new TextBox();
        progressBar1 = new ProgressBar();
        progressBar2 = new ProgressBar();
        SuspendLayout();
        // 
        // button1
        // 
        button1.Location = new Point(257, 137);
        button1.Margin = new Padding(2, 2, 2, 2);
        button1.Name = "button1";
        button1.Size = new Size(76, 21);
        button1.TabIndex = 0;
        button1.Text = "+     +";
        button1.UseVisualStyleBackColor = true;
        button1.Click += button1_Click;
        // 
        // textBox1
        // 
        textBox1.Location = new Point(173, 92);
        textBox1.Margin = new Padding(2, 2, 2, 2);
        textBox1.Name = "textBox1";
        textBox1.Size = new Size(102, 23);
        textBox1.TabIndex = 1;
        textBox1.TextAlign = HorizontalAlignment.Center;
        textBox1.TextChanged += textBox1_TextChanged;
        // 
        // textBox2
        // 
        textBox2.Location = new Point(324, 92);
        textBox2.Margin = new Padding(2, 2, 2, 2);
        textBox2.Name = "textBox2";
        textBox2.Size = new Size(102, 23);
        textBox2.TabIndex = 2;
        textBox2.TextAlign = HorizontalAlignment.Center;
        // 
        // textBox3
        // 
        textBox3.Location = new Point(206, 219);
        textBox3.Margin = new Padding(2, 2, 2, 2);
        textBox3.Name = "textBox3";
        textBox3.Size = new Size(189, 23);
        textBox3.TabIndex = 3;
        textBox3.TextAlign = HorizontalAlignment.Center;
        textBox3.TextChanged += textBox3_TextChanged;
        // 
        // progressBar1
        // 
        progressBar1.BackColor = SystemColors.MenuText;
        progressBar1.Location = new Point(159, 74);
        progressBar1.Margin = new Padding(2, 2, 2, 2);
        progressBar1.Name = "progressBar1";
        progressBar1.Size = new Size(101, 7);
        progressBar1.TabIndex = 4;
        // 
        // progressBar2
        // 
        progressBar2.Location = new Point(334, 63);
        progressBar2.Margin = new Padding(2, 2, 2, 2);
        progressBar2.Name = "progressBar2";
        progressBar2.Size = new Size(101, 9);
        progressBar2.TabIndex = 5;
        // 
        // Form1
        // 
        AutoScaleDimensions = new SizeF(7F, 15F);
        AutoScaleMode = AutoScaleMode.Font;
        ClientSize = new Size(622, 321);
        Controls.Add(progressBar2);
        Controls.Add(progressBar1);
        Controls.Add(textBox3);
        Controls.Add(textBox2);
        Controls.Add(textBox1);
        Controls.Add(button1);
        Margin = new Padding(2, 2, 2, 2);
        Name = "Form1";
        Text = "ебало";
        ResumeLayout(false);
        PerformLayout();
    }

    #endregion

    private Button button1;
    private TextBox textBox1;
    private TextBox textBox2;
    private TextBox textBox3;
    private ProgressBar progressBar1;
    private ProgressBar progressBar2;
}
