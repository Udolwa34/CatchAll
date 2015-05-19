class Contact < MailForm::Base
  attribute :subject,      :validate => true
  attribute :message
  attribute :nickname,  :captcha  => true
  attribute :reply


  # Declare the e-mail headers. It accepts anything the mail method
  # in ActionMailer accepts.
  def headers
    {
      :subject => "<#{subject}>",
      :to => "catchall.rails@gmail.com",
      :from => "CatchAll",
      :reply_to => "#{reply}"
    }
  end
end