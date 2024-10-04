import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

export default function QApolicy() {
  return (
    <div className="flex flex-col content-end">
      <div
        className="flex w-full items-end justify-center h-64 mb-10 relative bg-cover bg-center bg-blue-700 "
        style={{
          backgroundImage: "url('/images/ophpolicy/Our Services-86.jpg')",
        }}
      >
        <div className="absolute md:w-3/4 w-[84%] h-1/2 bottom-[-20%] p-2 rounded-t-lg bg-white flex justify-center items-center">
          <h1 className=" text-[#219EBC] md:text-2xl text-center text-xl">
            <span className="font-bold text-[#003047] text-center">
              Quality Assurance{" "}
            </span>{" "}
            (OHS) Policy{" "}
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
            Pure Hope Facility Management Pty Ltd is dedicated to delivering the
            highest standards of quality in all our services. We are committed
            to exceeding our clients' expectations through continuous
            improvement, adherence to best practices, and a focus on excellence
            in every aspect of our operations.
          </p>
          <h3 className="font-bold mb-2">Objectives</h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              To provide consistent, reliable, and high-quality facility
              management services that meet or exceed client expectations.
            </li>
            <li>
              {" "}
              To comply with all relevant industry standards, regulations, and
              contractual requirements.
            </li>
            <li>
              To foster a culture of quality awareness and continuous
              improvement throughout the organization
            </li>
            <li>
              To engage with clients, employees, and stakeholders to ensure
              their needs and expectations are understood and met.
            </li>
          </ul>

          <h3 className="font-bold mb-2">
            Responsibilities <br /> Management:
          </h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Provide leadership and resources to implement, maintain, and
              continually improve the Quality Management System (QMS).
            </li>
            <li>
              Ensure compliance with all relevant quality standards and
              regulations
            </li>
            <li>
              Conduct regular reviews and audits of the QMS to ensure its
              effectiveness and relevance.
            </li>
            <li>
              Promote a culture of quality and continuous improvement across the
              organization.
            </li>
            <li>
              Facilitate training and development programs to enhance the skills
              and knowledge of employees.
            </li>
          </ul>

          <h3 className="font-bold mb-2">Employees:</h3>
          <ul className="list-disc list-inside text-sm mb-4">
            <li>
              Adhere to the quality policies, procedures, and standards set by
              the company.
            </li>
            <li>
              Take ownership of their work and strive for excellence in all
              tasks and responsibilities..
            </li>
            <li>
              Participate in quality improvement initiatives and provide
              feedback for enhancing service quality.
            </li>
            <li>
              Report any issues, non-conformities, or opportunities for
              improvement to their supervisor or the quality team.
            </li>
          </ul>
          <h3 className="font-bold mb-2">
            Key Elements of the Quality Management System (QMS)
          </h3>
          <h3 className="font-bold mb-2">1.Customer Focus:</h3>
          <ul className="list-disc list-inside text-sm">
            <li>Understand and meet the needs and expectations of clients</li>
            <li>
              Foster strong relationships with clients through effective
              communication and responsiveness.
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold mb-2">2. Process Approach:</h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Implement and maintain efficient processes that ensure consistent
              service quality.
            </li>
            <li>
              Regularly review and optimize processes to enhance efficiency and
              effectiveness.
            </li>
          </ul>

          <h3 className="font-bold mb-2">3. Continuous Improvement:</h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Promote a culture of continuous improvement across all levels of
              the organization
            </li>
            <li>
              Use feedback, audits, and performance data to identify areas for
              improvement and implement corrective actions.
            </li>
          </ul>

          <h3 className="font-bold mb-2">
            4. Employee Engagement and Training:
          </h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Provide ongoing training and development opportunities to ensure
              employees have the necessary skills and knowledge
            </li>
            <li>
              Encourage employee participation in quality improvement
              initiatives and recognize their contributions.
            </li>
          </ul>

          <h3 className="font-bold mb-2">5. Performance Measurement:</h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Establish and monitor key performance indicators (KPIs) to measure
              service quality and client satisfaction.
            </li>
            <li>
              Conduct regular reviews and assessments to ensure targets are met
              and identify areas for improvement.
            </li>
          </ul>

          <h3 className="font-bold mb-2">
            5. Upplier and Partner Relationships:
          </h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            <li>
              Work closely with suppliers and partners to ensure they meet our
              quality standards and contribute to our overall service
              excellence.
            </li>
            <li>
              Conduct regular evaluations of suppliers and partners to ensure
              consistent quality and reliability
            </li>
          </ul>

          <h3 className="font-bold mb-2">Review and Continuous Improvement:</h3>
          <ul className="list-disc list-inside mb-4 text-sm">
            This Quality Assurance Policy will be reviewed annually, or more
            frequently if required, to ensure its continued relevance and
            effectiveness. Feedback from clients, employees, and stakeholders,
            as well as changes in industry standards and best practices, will be
            considered in the review process.
          </ul>

          <h3 className="font-bold mb-2">Commitment:</h3>
          <ul className="list-disc list-inside text-sm">
            Pure Hope Facility Management Pty Ltd is committed to achieving and
            maintaining the highest standards of quality in all our services. By
            working together, we can ensure continuous improvement and deliver
            exceptional value to our clients.
          </ul>
        </div>
      </div>
    </div>
  );
}
