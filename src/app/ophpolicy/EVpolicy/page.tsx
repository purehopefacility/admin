import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function EVpolicy() {
  return (
    <div className="flex flex-col content-end">
      <div
        className="flex w-full items-end justify-center h-64 mb-10 relative bg-cover bg-center bg-blue-700 "
        style={{
          backgroundImage: "url('/images/ophpolicy/environmental.png')",
        }}
      >
        <div className="absolute md:w-3/4 w-[84%] h-1/2 bottom-[-20%] p-2 rounded-t-lg bg-white flex justify-center items-center">
          <h1 className=" text-[#219EBC] md:text-2xl text-center text-xl">
            <span className="font-bold text-[#003047] text-center">
              Environmental{" "}
            </span>{" "}
            Policy{" "}
          </h1>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 justify-center md:mx-[13%] my-10 p-10 border-2 rounded-xl shadow-lg xl:mb-20">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold mb-2">
            Pure Hope Facility Management Pty Ltd <br />
            Policy Statement
          </h2>
          <p className="mb-4 text-sm">
            Pure Hope Facility Management Pty Ltd is committed to minimizing our
            environmental impact and promoting sustainability in all aspects of
            our operations. We recognize the importance of environmental
            stewardship and are dedicated to integrating environmental
            considerations into our decision-making processes and daily
            activities. Our goal is to contribute positively to the environment
            by reducing waste, conserving resources, and promoting responsible
            practices throughout our organization.
          </p>
          <h3 className="font-bold mb-2">Objectives</h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              To comply with all relevant environmental laws, regulations, and
              standards.
            </li>
            <li>
              To continually improve our environmental performance through the
              implementation of best practices and the use of innovative
              technologies.
            </li>
            <li>
              To minimize waste generation and promote recycling and reuse
              initiatives.
            </li>
            <li>
              To educate and engage our employees, clients, and stakeholders on
              environmental issues and encourage sustainable practices.
            </li>
            <li>
              To monitor and regularly review our environmental objectives and
              targets to ensure their achievement.
            </li>
          </ul>

          <h3 className="font-bold mb-2">Responsibilities Management:</h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Provide leadership and resources to develop, implement, and
              maintain an effective Environmental Management System (EMS).
            </li>
            <li>
              Ensure compliance with environmental regulations and requirements
              applicable to our operations.
            </li>
            <li>
              Set environmental objectives and targets that are measurable,
              achievable, and aligned with our commitment to sustainability.
            </li>
            <li>
              Allocate resources for the implementation of environmental
              initiatives and improvement projects.
            </li>
            <li>
              Periodically review and assess the effectiveness of the EMS and
              environmental performance
            </li>
          </ul>

          <h3 className="font-bold mb-2">Employees:</h3>
          <ul className="list-disc list-inside text-sm mb-4">
            <li>
              Follow environmental policies, procedures, and guidelines in all
              activities and operations.
            </li>
            <li>
              Actively participate in environmental programs and initiatives
              aimed at reducing our environmental footprint.
            </li>
            <li>
              Report any environmental incidents, non-compliance issues, or
              opportunities for improvement to management.
            </li>
            <li>
              Contribute ideas and suggestions for improving environmental
              practices within the organization.
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">
            Key Elements of the Environmental Management System (EMS)
          </h2>
          <h3 className="font-bold mb-2">1. Resource Conservation:</h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Promote the efficient use of energy, water, and other natural
              resources in our facilities and operations.
            </li>
            <li>
              Implement measures to reduce consumption and optimize resource
              efficiency.
            </li>
          </ul>

          <h3 className="font-bold mb-2">2. Waste Management:</h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Minimize waste generation through source reduction, recycling, and
              reuse initiatives
            </li>
            <li>
              Dispose of waste responsibly and in compliance with environmental
              regulations.
            </li>
          </ul>

          <h3 className="font-bold mb-2">3. Pollution Prevention:</h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Implement measures to prevent pollution and minimize environmental
              impacts associated with our activities.
            </li>
            <li>
              Control emissions and discharges to air, water, and land to
              protect environmental quality
            </li>
          </ul>

          <h3 className="font-bold mb-2">4. Sustainable Procurement:</h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Source environmentally preferable products and services that meet
              our sustainability criteria.
            </li>
            <li>
              Encourage suppliers and contractors to adopt environmentally
              responsible practices.
            </li>
          </ul>

          <h3 className="font-bold mb-2">
            5. Environmental Awareness and Training:
          </h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Raise awareness among employees about environmental issues and the
              importance of sustainability.
            </li>
            <li>
              Provide training and education to empower employees to take
              proactive steps towards environmental conservation.
            </li>
          </ul>

          <h3 className="font-bold mb-2">6. Community Engagement:</h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Engage with local communities and stakeholders on environmental
              matters
            </li>
            <li>
              Support initiatives and partnerships that promote environmental
              sustainability and community well-being.
            </li>
          </ul>

          <h3 className="font-bold mb-2">Review and Continuous Improvement:</h3>
          <ul className="list-disc list-inside mb-4 text-sm text-justify">
            This Environmental Policy will be reviewed annually, or more
            frequently if required, to ensure its ongoing relevance and
            effectiveness. Feedback from employees, stakeholders, and
            environmental audits will be considered in the review process. We
            are committed to continuous improvement and to achieving our
            environmental objectives.
          </ul>

          <h3 className="font-bold mb-2">Commitment:</h3>
          <ul className="list-disc list-inside text-sm text-justify">
            Pure Hope Facility Management Pty Ltd is committed to conducting our
            business in a manner that protects and preserves the environment. By
            integrating environmental considerations into our operations and
            fostering a culture of sustainability, we aim to make a positive
            impact on the environment and contribute to a greener future.
          </ul>
        </div>
      </div>
    </div>
  );
}
