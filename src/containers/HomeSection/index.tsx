import { Stack } from '@mui/material';
import SectionAboutUs from './SectionAboutUs';
import SectionAdvantages from './SectionAdvantages';
import SectionEntryLevel from './SectionEntryLevel';
import SectionStandoutCourses from './SectionStandoutCourses';
import SectionStandoutTeachers from './SectionStandoutTeachers';
import SectionStudentStories from './SectionStudentStories';
import SectionOrientation from './SectionOrientation';
import SectionContactUs from './SectionContactUs';

export default function HomePageSection() {
  return (
    <>
      <SectionAboutUs />
      <SectionAdvantages />
      <SectionEntryLevel />
      <SectionStandoutCourses />
      <SectionStandoutTeachers />
      <SectionStudentStories />
      <SectionOrientation />
      <SectionContactUs />
      <Stack
        dangerouslySetInnerHTML={{
          __html: `
        <div id="fb-root"></div>
    
        <div id="fb-customer-chat" class="fb-customerchat"></div>
    
        <script>
          if (window.location.pathname.includes('homepage')) {
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute('page_id', '107932629047954');
            chatbox.setAttribute('attribution', 'biz_inbox');
          }
        </script>
    
        <!-- Your SDK code -->
        <script>
          if (window.location.pathname.includes('homepage')) {
            window.fbAsyncInit = function () {
              FB.init({
                xfbml: true,
                version: 'v17.0',
              });
            };
    
            (function (d, s, id) {
              var js,
                fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s);
              js.id = id;
              js.src =
                'https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            })(document, 'script', 'facebook-jssdk');
          }
        </script>
    
        <script type="module" src="/src/main.tsx"></script>`,
        }}
      />
    </>
  );
}
