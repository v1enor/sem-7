namespace WinForms
{
    partial class SummForm
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
            reguestButton = new Button();
            parxTextBox = new TextBox();
            paryTextBox = new TextBox();
            resultTextBox = new TextBox();
            SuspendLayout();
            // 
            // reguestButton
            // 
            reguestButton.Location = new Point(29, 129);
            reguestButton.Name = "reguestButton";
            reguestButton.Size = new Size(272, 168);
            reguestButton.TabIndex = 0;
            reguestButton.Text = "Summ";
            reguestButton.UseVisualStyleBackColor = true;
            reguestButton.Click += reguestButton_Click;
            // 
            // parxTextBox
            // 
            parxTextBox.Location = new Point(29, 30);
            parxTextBox.Name = "parxTextBox";
            parxTextBox.Size = new Size(272, 23);
            parxTextBox.TabIndex = 1;
            // 
            // paryTextBox
            // 
            paryTextBox.Location = new Point(29, 59);
            paryTextBox.Name = "paryTextBox";
            paryTextBox.Size = new Size(272, 23);
            paryTextBox.TabIndex = 2;
            // 
            // resultTextBox
            // 
            resultTextBox.Location = new Point(29, 88);
            resultTextBox.Name = "resultTextBox";
            resultTextBox.Size = new Size(272, 23);
            resultTextBox.TabIndex = 3;
            // 
            // SummForm
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(338, 320);
            Controls.Add(resultTextBox);
            Controls.Add(paryTextBox);
            Controls.Add(parxTextBox);
            Controls.Add(reguestButton);
            Name = "SummForm";
            Text = "SummForm";
            Load += Form1_Load;
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button reguestButton;
        private TextBox parxTextBox;
        private TextBox paryTextBox;
        private TextBox resultTextBox;
    }
}