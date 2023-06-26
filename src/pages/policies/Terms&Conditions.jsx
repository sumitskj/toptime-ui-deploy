import styled from '@emotion/styled';
import { LogoWithName } from '../../components/logo/Logo';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TermsAndConditions = () => {
  const navigate = useNavigate();
  const handleNavigateHome = () => {
    navigate('/');
  };

  const TextStyled = styled(Typography)`
    text-align: justify;
    position: relative;
    width: 90%;
  `;

  return (
    <>
      <AppBar position='relative' sx={{ backgroundColor: '#FFECEC' }}>
        <Toolbar disableGutters>
          <div style={{ marginLeft: '1rem', cursor: 'pointer' }} onClick={handleNavigateHome}>
            <LogoWithName />
          </div>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
          mt: '1rem',
        }}>
        <Typography sx={{ fontSize: '2.5rem', fontWeight: '600', textAlign: 'center' }}>
          Terms and Conditions
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
        }}>
        <br />
        <TextStyled>
          Welcome to TopTime! <br />
          <br /> These Terms and Conditions (&quot;Terms&quot;) govern your use of the website
          https://www.toptime.club/ (the &quot;Website&quot;), which is owned and operated by Kipono
          Technologies Pvt. Ltd. (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or
          &quot;us&quot;). By accessing or using the Website, you agree to be bound by these Terms.
          If you do not agree to these Terms, please refrain from using the Website.
        </TextStyled>

        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Use of the Website
        </TextStyled>
        <TextStyled>
          <br />
          a. Eligibility: <br />
          To use the Website, you must be at least 18 years old. By using the Website, you represent
          and warrant that you are at least 18 years old.
          <br />
          <br />
          b. Account Registration:
          <br />
          To access certain features and services on the Website, you may be required to create an
          account. You are responsible for maintaining the confidentiality of your account
          information, including your username and password. You agree to provide accurate, current,
          and complete information during the registration process. You must notify us immediately
          of any unauthorized use of your account.
          <br />
          <br />
          c. User Conduct:
          <br />
          When using the Website, you agree to:
          <br />
          - Comply with all applicable laws, regulations, and these Terms. <br />
          - Respect the privacy and intellectual property rights of others. <br />
          - Not engage in any fraudulent, abusive, or illegal activities. <br />
          - Not disrupt or interfere with the functioning of the Website. <br />- Not transmit any
          viruses, malware, or harmful code.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Services and Payments
        </TextStyled>
        <TextStyled>
          <br />
          a. Expert Services: <br />
          The Website serves as a platform where experts offer 1-1 calls to users seeking expert
          advice or guidance. The Company does not provide these services directly but acts as an
          intermediary facilitating connections between experts and users.
          <br />
          <br />
          b. Payments <br />
          The pricing for expert services is based on a per minute rate. Users will be charged
          according to the duration of the call with the expert. Payments are processed through
          secure third-party payment processors. By using the Website, you agree to pay for any
          services you book and authorize the Company to facilitate the transaction on your behalf.
          <br />
          <br />
          c. Fees <br />
          The fees for using the expert services on the App are set by the experts themselves, and
          the Company does not control or take any commission on these fees. Payments are processed
          by a third-party payment processor, and you must provide valid payment information to use
          the services.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          User Content
        </TextStyled>
        <TextStyled>
          <br />
          a. User Responsibilities: <br />
          As a user of the Website, you are solely responsible for any content you post, upload, or
          transmit on the Website, including text, images, and any other materials (&quot;User
          Content&quot;). You retain ownership of your User Content, but by posting it on the
          Website, you grant the Company a non-exclusive, royalty-free, worldwide license to use,
          display, reproduce, and distribute your User Content for the purposes of operating and
          promoting the Website.
          <br />
          <br />
          b. Prohibited Content: <br />
          You agree not to post any User Content that is:
          <br />
          - False, misleading, or deceptive.
          <br />- Infringing upon the intellectual property rights of others.
          <br />- Offensive, defamatory, or violates any privacy or publicity rights.
          <br />- Unlawful or promotes illegal activities.
          <br />- Contains viruses, malware, or other harmful code.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Cancellation and Refund Policy
        </TextStyled>
        <TextStyled>
          <br />
          - A booking can be cancelled at any time before the call has started or before any one of
          user or expert has joined the call.
          <br />- If the booking is cancelled by user before 1hr of its scheduled time, user will
          get 100% refund.
          <br />- If the booking is cancelled by user within 1hr of its scheduled time, user will
          get 50% refund and expert will get remaining 50%.
          <br />- If the booking is cancelled by expert, user will get 100% refund.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Account Wallet information
        </TextStyled>
        <TextStyled>
          <br />- Money from user wallet is not withdrawable. Once the wallet is recharged, you can
          then only use this money to book calls with experts.
          <br />- Money from professional wallet is withdrawable, and it takes around 3 working days
          to deposit the withdrawn amount to professionals bank account.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Complains Processing
        </TextStyled>
        <TextStyled>
          <br />
          - Users can raise complain regarding any booking within 12 hrs after the call with expert
          has ended. <br />- The complain will be addressed within 24hrs of its creation.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Information about professionals booking
        </TextStyled>
        <TextStyled>
          <br />- After a call with professional has ended, user has 12hrs to report any complain
          regarding call.
          <br />- After 12 hrs, if user do not raise any complain, booking amount will be credited
          to professional wallet
          <br />- After 12 hrs, if user raises any complain, booking amount will be credited or not
          credited to professional wallet after the complain is resolved.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Termination
        </TextStyled>
        <TextStyled>
          <br />
          The Company may terminate your access to the App at any time, for any reason, without
          notice. Upon termination, you must immediately stop using the App.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Intellectual Property
        </TextStyled>
        <TextStyled>
          <br />
          The Website and its contents, including but not limited to logos, trademarks, text,
          graphics, images, and software, are the property of the Company or its licensors and are
          protected by intellectual property laws. You are granted a limited, non-exclusive,
          non-transferable license to access and use the Website for personal, non-commercial
          purposes. You agree not to modify, reproduce, distribute, or create derivative works based
          on the Website without prior written consent from the Company.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Privacy Policy
        </TextStyled>
        <TextStyled>
          <br />
          Your privacy is important to us. Please refer to our Privacy Policy, which explains how we
          collect, use, and protect your personal information. By using the Website, you consent to
          the collection and use of your personal information as described in the Privacy Policy.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Reservation of Rights
        </TextStyled>
        <TextStyled>
          <br />
          We reserve the right to request that you remove all links or any particular link to our
          Website. You approve to immediately remove all links to our Website upon request. We also
          reserve the right to amen these terms and conditions and it’s linking policy at any time.
          By continuously linking to our Website, you agree to be bound to and follow these linking
          terms and conditions.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          iFrames
        </TextStyled>
        <TextStyled>
          <br />
          Without prior approval and written permission, you may not create frames around our
          Webpages that alter in any way the visual presentation or appearance of our Website.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Removal of links from our website
        </TextStyled>
        <TextStyled>
          <br />
          If you find any link on our Website that is offensive for any reason, you are free to
          contact and inform us any moment. We will consider requests to remove links but we are not
          obligated to or so or to respond to you directly. We do not ensure that the information on
          this website is correct, we do not warrant its completeness or accuracy; nor do we promise
          to ensure that the website remains available or that the material on the website is kept
          up to date.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Disclaimer
        </TextStyled>
        <TextStyled>
          <br />
          To the maximum extent permitted by applicable law, we exclude all representations,
          warranties and conditions relating to our website and the use of this website. Nothing in
          this disclaimer will:
          <br />- limit or exclude our or your liability for death or personal injury;
          <br />- limit or exclude our or your liability for fraud or fraudulent misrepresentation;
          <br />- limit any of our or your liabilities in any way that is not permitted under
          applicable law; or
          <br />- exclude any of our or your liabilities that may not be excluded under applicable
          law.
          <br />
          The limitations and prohibitions of liability set in this Section and elsewhere in this
          disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities
          arising under the disclaimer, including liabilities arising in contract, in tort and for
          breach of statutory duty. As long as the website and the information and services on the
          website are provided free of charge, we will not be liable for any loss or damage of any
          nature.
          <br />
          <br />
        </TextStyled>
      </Box>
    </>
  );
};

export default TermsAndConditions;
