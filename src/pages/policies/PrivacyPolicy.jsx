import styled from '@emotion/styled';
import { LogoWithName } from '../../components/logo/Logo';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
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
          Privacy Policy
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
        <TextStyled>Effective Date: 30 June 2023</TextStyled>
        <br />
        <TextStyled>
          This Privacy Policy outlines how Kipono Technologies Pvt. Ltd. (&quot;Company,&quot;
          &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) collects, uses, discloses, and
          safeguards the personal information of users (&quot;you&quot; or &quot;your&quot;) when
          you visit and use our website, https://www.toptime.club/ (&quot;Website&quot;). We are
          committed to protecting your privacy and ensuring the security of your personal
          information. By accessing or using the Website, you consent to the practices described in
          this Privacy Policy.
        </TextStyled>
        <br />
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Information We Collect:
        </TextStyled>
        <TextStyled>
          <br />
          a. Personal Information: We may collect personal information from you when you visit our
          Website or register an account with us. This information may include but is not limited
          to: <br />- Your name <br />- Email address <br />- Contact number <br />- Billing address{' '}
          <br />- Payment information <br />- Profile picture <br />- Professional expertise and
          background
          <br />
          <br />
          b. Usage Information: We may also collect non-personal information about your use of the
          Website, including but not limited to:
          <br />- IP address
          <br />- Browser type
          <br />- Operating system
          <br />- Referring URLs
          <br />- Clickstream data
          <br />- Date and time of visits
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Log Data
        </TextStyled>
        <TextStyled>
          I want to inform you that whenever you use my Service, in a case of an error in the app I
          collect data and information (through third-party products) on your phone called Log Data.
          This Log Data may include information such as your device Internet Protocol (“IP”)
          address, device name, operating system version, the configuration of the app when
          utilizing my Service, the time and date of your use of the Service, and other statistics.
        </TextStyled>
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Use of Information:
        </TextStyled>
        <TextStyled>
          We collect and use your personal information for the following purposes:
          <br />- To create and manage your account
          <br />- To facilitate communication between experts and users
          <br />- To process payments for services provided
          <br />- To personalize and improve your experience on the Website
          <br />- To send you administrative and promotional emails
          <br />- To respond to your inquiries and provide customer support
          <br />- To enforce our terms and conditions and protect our legal rights
        </TextStyled>
        <br />
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Sharing of Information:
        </TextStyled>
        <TextStyled>
          We may share your personal information in the following circumstances:
          <br />- With experts or service providers who are necessary for providing the requested
          services
          <br />- With third-party payment processors to process transactions
          <br />- With third parties for marketing and promotional purposes, provided you have given
          us your consent
          <br />- When required by law or to protect our legal rights
        </TextStyled>
        <br />
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Security:
        </TextStyled>
        <TextStyled>
          We take reasonable measures to protect the security and confidentiality of your personal
          information. However, please note that no data transmission over the internet or
          electronic storage method is 100% secure, and we cannot guarantee its absolute security.
        </TextStyled>
        <br />
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Cookies and Tracking Technologies:
        </TextStyled>
        <TextStyled>
          We use cookies and similar tracking technologies to enhance your experience on our
          Website, analyze trends, and administer the site. You can manage your cookie preferences
          through your browser settings.
        </TextStyled>
        <br />
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Third-Party Links:
        </TextStyled>
        <TextStyled>
          Our Website may contain links to third-party websites. We are not responsible for the
          privacy practices or content of those websites. We encourage you to review the privacy
          policies of those websites before providing any personal information.
        </TextStyled>
        <br />
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Children&apos;s Privacy:
        </TextStyled>
        <TextStyled>
          The Website is not intended for children under the age of 18. We do not knowingly collect
          personal information from children. If you believe we have inadvertently collected
          information from a child, please contact us to have it removed.
        </TextStyled>
        <br />
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Your Choices:
        </TextStyled>
        <TextStyled>
          You have the right to access, modify, or delete your personal information by contacting
          us. You may also unsubscribe from our promotional emails by following the instructions
          provided in the email.
        </TextStyled>
        <br />
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Changes to the Privacy Policy:
        </TextStyled>
        <TextStyled>
          We may update this Privacy Policy from time to time. Any changes will be effective upon
          posting the revised policy on the Website. We encourage you to review this page
          periodically for the latest information on our privacy practices.
        </TextStyled>
        <br />
        <TextStyled sx={{ fontWeight: '600' }}>
          <br />
          Contact Us:
        </TextStyled>
        <TextStyled>
          If you have any questions, concerns, or requests regarding this Privacy Policy or the
          handling of your personal information, please contact us at{' '}
          <a href='management@toptime.club'>management@toptime.club</a>.
        </TextStyled>
        <br />
        <br />
        <TextStyled>
          <br />
          By using the Website, you acknowledge that you have read and understood this Privacy
          Policy and agree to the collection, use, and disclosure of your personal information as
          described herein.
        </TextStyled>
        <br />
        <br />
      </Box>
    </>
  );
};

export default PrivacyPolicy;
