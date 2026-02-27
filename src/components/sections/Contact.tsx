import { Loader } from "../ui/Loader";
import Typography from "../ui/typography";

function Contact() {
  return (
    <div
      id="contact"
      className="container-section flex-col bg-white p-0 snap-start"
    >
      <div className="container-content mx-auto flex-1 ">
        <div className="flex flex-col items-center justify-center">
          <Typography.H2>Let's talk!</Typography.H2>
          <Loader />
        </div>
      </div>
      <div className="bg-violet-800 min-h-56 ">
        <div className="container-content mx-auto flex-1 px-12 xl:px-0 space-y-4">
          <Typography.P className="text-yellow-300 font-semibold">
            SAY HELLO! 👋
          </Typography.P>
          <a href="mailto:agustinrzarate@gmail.com">
            <Typography.P className="text-white">
              agustinrzarate@gmail.com
            </Typography.P>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
