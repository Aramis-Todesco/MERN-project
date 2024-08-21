import styles from "./TermsConditions.module.css";
import TermsContent from "../../modules/TermsContent/TermsContent.jsx";

function TermsConditions() {
  return (
    <main className={styles["terms-main"]}>
      <section className={styles["terms-conditions-wrapper"]}>
        <h1>Terms and Conditions of Use</h1>
        <TermsContent
          title=" 1. Acceptance of Terms"
          paragraph="By accessing and using this website, you agree to be bound by these
            Terms and Conditions of Use. If you do not agree to these terms,
            please do not use the site."
        />
        <TermsContent
          title="2. Changes to the Terms"
          paragraph="We reserve the right to modify or update these Terms and Conditions
            of Use at any time without prior notice. Changes will take effect
            immediately upon being posted on the website. Your continued use of
            the site after any changes are posted constitutes your acceptance of
            the new terms."
        />
        <TermsContent
          title="3. Use of the Site"
          paragraph="  You agree to use the website solely for lawful purposes and in
            accordance with these Terms and Conditions. You agree not to use the
            site to: Disseminate any unlawful, offensive, harmful, or defamatory
            content. Infringe upon the intellectual property rights of others.
            Compromise the security of the site or attempt to gain unauthorized
            access to data. Use the site in any way that could damage, disable,
            or impair it, or interfere with any other party's use of the
            site."
        />
        <TermsContent
          title="4. Intellectual Property"
          paragraph="All content, features, and functionality on this website, including
            text, graphics, logos, and images, are the property of [Your Company
            Name] or its licensors and are protected by copyright, trademark,
            and other intellectual property laws. You may not reproduce,
            distribute, or otherwise use any content without prior written
            permission."
        />
        <TermsContent
          title="5. Limitation of Liability"
          paragraph="[Your Company Name] will not be liable for any direct, indirect,
            incidental, or consequential damages arising out of your use of, or
            inability to use, this site, even if [Your Company Name] has been
            advised of the possibility of such damages."
        />

        <TermsContent
          title="6. Governing Law"
          paragraph="These Terms and Conditions of Use are governed by and construed in
            accordance with the laws of [Your Jurisdiction]. Any disputes
            arising under or in connection with these terms will be subject to
            the exclusive jurisdiction of the courts of [Your Jurisdiction]."
        />

        <TermsContent
          title="7. Contact Information"
          paragraph="If you have any questions about these Terms and Conditions of Use,
            please contact us at [Your Contact Information]."
        />
      </section>
    </main>
  );
}

export default TermsConditions;
