import { atom } from "recoil";
import { courseParams } from "types";
const course: courseParams & { _id: string } = {
  _id: "",
  title: "",
  description: "",
  price: 0,
  imageLink: "",
  published: false,
};
export const courseState = atom({
  key: "courseState",
  default: {
    isLoading: true,
    course: course,
  },
});
