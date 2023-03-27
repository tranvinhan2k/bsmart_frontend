export interface SubCoursePayload {
  id: number;
  title: string;
  level: string;
  status: string;
  price: number;
  startDateExpected: string;
  endDateExpected: string;
  typeLearn: string;
  minStudent: number;
  maxStudent: number;
  image: {
    id: number;
    name: string;
    url: string;
  };
  timeInWeeks: SubCourseTimeInWeek[];
}

export interface SubCourseTimeInWeek {
  dayOfWeek: {
    id: number;
    name: string;
    code: string;
  };
  clazz: {
    id: number;
    code: string;
    typeLearn: string;
  };
  slot: {
    id: number;
    name: string;
    code: string;
    startTime: {
      hour: number;
      minute: number;
      second: number;
      nano: number;
    };
    endTime: {
      hour: number;
      minute: number;
      second: number;
      nano: number;
    };
  };
}
