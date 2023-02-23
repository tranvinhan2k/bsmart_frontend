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
    </>
  );
}
