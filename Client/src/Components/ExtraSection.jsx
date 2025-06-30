import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExtraSection = () => {
    return (
        <div className="bg-purple-700 my-12 text-white rounded-2xl py-12 md:py-16 px-5 lg:p-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Ready to create your own event?</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6">
            Join thousands of event organizers who are creating memorable experiences on EventHub.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup" className="bg-white text-purple-700 font-semibold px-6 py-3 place-items-center gap-2 cursor-pointer inline-flex rounded-full shadow hover:bg-purple-100 transition">
              <FaUser/> Sign Up for Free
            </Link>
          </div>
        </div>
    );
};

export default ExtraSection;