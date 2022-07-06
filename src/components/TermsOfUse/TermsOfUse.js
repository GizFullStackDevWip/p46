import React, { useState, useEffect } from "react";
const WebTermsOfUse = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="menuCloseJS closeMenuWrapper">
        <div className="privacyTermsFlex privacyTermsColor">
          <div className="privacyTermsWidth">
            <h1 className="privacyTermsHeading">Terms of Use</h1>
            <div className="privacyTermsWrapper">
              <div className="privacyTermsContent">
              

<h5 className="termsofuseHeading" > Personal information you disclose to us </h5>
<p className="termsofusePara" >In Short: We collect personal information that you provide to us.</p>

<p className="termsofusePara">We collect personal information that you voluntarily provide to us when you register on the Services,
express an interest in obtaining information about us or our products and Services, when you participate in
activities on the Services (such as by posting messages in our online forums or entering competitions, contests
or giveaways) or otherwise when you contact us.The personal information that we collect depends on the 
context of your interactions with us and the Services, the choices you make and the products and features you use. 
The personal information we collect may include the following:</p>

<p className="termsofusePara">Personal Information Provided by You. We collect names; phone numbers; email addresses; mailing addresses;
job titles; usernames; passwords; billing addresses; debit/credit card numbers; contact or authentication data; 
contact preferences; and other similar information.</p>

<p className="termsofusePara">Payment Data. We may collect data necessary to process your payment if you make purchases, 
  such as your payment instrument number (such as a credit card number),
and the security code associated with your payment instrument. All payment data is stored by Stripe.
 You may find their privacy notice link(s) here: https://stripe.com/privacy
All personal information that you provide to us must be true, complete and accurate, and you must notify
 us of any changes to such personal information.</p>




              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WebTermsOfUse;
