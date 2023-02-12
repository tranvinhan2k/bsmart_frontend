import twitter from '~/assets/images/icons8_twitter_26px.png';
import linkedin from '~/assets/images/icons8_linkedin_26px.png';
import dribbble from '~/assets/images/icons8_dribbble_26px.png';
import facebook from '~/assets/images/icons8_facebook_52px.png';
import instagram from '~/assets/images/icons8_instagram_52px.png';
import pinterest from '~/assets/images/icons8_pinterest_52px.png';
import { SocialPayload } from '~/models';

export const HeaderSocialDataList: SocialPayload[] = [
  {
    name: 'Twitter',
    link: 'https://twitter.com',
    image: twitter,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/',
    image: linkedin,
  },
  {
    name: 'Dribbble',
    link: 'https://dribbble.com/',
    image: dribbble,
  },
];
export const FooterSocialDataList: SocialPayload[] = [
  {
    name: 'Facebook',
    link: 'https://facebook.com/',
    image: facebook,
  },
  {
    name: 'Twitter',
    link: 'https://twitter.com',
    image: twitter,
  },
  {
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/',
    image: linkedin,
  },
  {
    name: 'Pinterest',
    link: 'https://pinterest.com/',
    image: pinterest,
  },

  {
    name: 'Instagram',
    link: 'https://instagram.com/',
    image: instagram,
  },
];

export default {};
