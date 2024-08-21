import TermsContent from "../../modules/TermsContent/TermsContent.jsx";
import styles from "./Copyright.module.css";

function Copyright() {
  return (
    <main className={styles["terms-main"]}>
      <section className={styles["terms-conditions-wrapper"]}>
        <h1>Copyright Notice</h1>
        <TermsContent
          title="1. Ownership of Content"
          paragraph="All content included on this website, such as text, graphics, logos, images, audio clips, video clips, digital downloads, data compilations, and software, is the property of [Your Company Name] or its content suppliers and is protected by international copyright laws. The compilation of all content on this site is the exclusive property of [Your Company Name] and is protected by international copyright laws."
        />
        <TermsContent
          title="2. Use of Content"
          paragraph="You may access and use the content on this website solely for your personal, non-commercial use. You are not permitted to reproduce, distribute, modify, transmit, reuse, download, repost, copy, or use the content of this website, whether in whole or in part, for commercial purposes without the prior written consent of [Your Company Name]."
        />
        <TermsContent
          title="3. Trademarks"
          paragraph="All trademarks, service marks, and trade names displayed on this website are the property of [Your Company Name] or their respective owners. Unauthorized use of any trademarks, service marks, or trade names is strictly prohibited and may violate trademark laws."
        />
        <TermsContent
          title="4. Copyright Infringement "
          paragraph="If you believe that any content on this website infringes your copyright, you may notify us in accordance with the Digital Millennium Copyright Act (DMCA) or other applicable copyright laws. Your notification should include a physical or electronic signature of a person authorized to act on behalf of the copyright owner, a description of the copyrighted work that you believe has been infringed, and a description of where the infringing material is located on the website.You should also provide your address, phone number, and email address, along with a statement that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law. Additionally, include a statement made under penalty of perjury that the information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.Please send this information to our contact address provided."
        />
        <TermsContent
          title="5. Third-Party Content"
          paragraph="Any content provided by third parties, such as user-generated content, remains the property of the respective owners. [Your Company Name] does not claim ownership of such content, and it is protected by copyright, trademark, and other intellectual property laws as applicable. If you wish to use any third-party content on this website, you must obtain permission directly from the content owner."
        />
        <TermsContent
          title="6. License for Submitted Content"
          paragraph="By submitting content to this website, including but not limited to text, photos, videos, and audio, you grant [Your Company Name] a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media."
        />
        <TermsContent
          title="7. Termination of Use"
          paragraph="[Your Company Name] reserves the right to terminate any user's access to this website if it believes that the user has violated any of the terms regarding the use of content, including but not limited to copyright infringement."
        />
        <TermsContent
          title="8. Governing Law
"
          paragraph="This Copyright Notice is governed by the laws of [Your Jurisdiction]. Any disputes arising out of or in connection with this notice will be resolved in accordance with the applicable laws of [Your Jurisdiction]."
        />
        <TermsContent
          title="9. Contact Information"
          paragraph="For any questions or concerns regarding this Copyright Notice, or to report any potential copyright infringements, please contact us at:[Your Company Name]
          [Your Address]
          [Your City, State, ZIP Code]
          [Your Email Address]
          [Your Phone Number]"
        />
      </section>
    </main>
  );
}

export default Copyright;
