# mail_service.py
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import os

class MailService:
    SMTP_SERVER = "smtp.gmail.com"
    PORT = 465
    SENDER_EMAIL = os.getenv('SENDER_EMAIL')
    PASSWORD = os.getenv('EMAIL_PASSWORD')
    CONTEXT = ssl.create_default_context()

    def send_mail(self, template, receiver_email, name, subject):
        message = MIMEMultipart('alternative')
        message["Subject"] = subject
        message["From"] = self.SENDER_EMAIL
        message["To"] = receiver_email

        text = f"Hi, {name}\n{template}"
        html = f"""\
        <html>
          <body>
            <h2>Hi, {name}</h2>
            <p>{template}</p>
          </body>
        </html>
        """

        message.attach(MIMEText(text, "plain"))
        message.attach(MIMEText(html, "html"))

        try:
            with smtplib.SMTP_SSL(self.SMTP_SERVER, self.PORT, context=self.CONTEXT) as server:
                server.login(self.SENDER_EMAIL, self.PASSWORD)
                server.sendmail(self.SENDER_EMAIL, receiver_email, message.as_string())
        except Exception as e:
            raise Exception(f"Error sending email: {e}")
