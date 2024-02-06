import React from "react";

import { FAQProps } from ".";

function VariantA({ subtitle, title, faqs }: FAQProps) {
  const [show, setShow] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [faqsPerPage] = React.useState(6);
  const [searchTerm, setSearchTerm] = React.useState(null);

  const updatedFAQArray = faqs?.map((items) => ({ ...items, hidden: true }));

  // toggle view or hide answers on click for each FAQ items
  const toggleView = (position) => {
    setActiveTab(position);
    setShow(!show);
  };

  // get current FAQs
  const indexOfLastQuestion = currentPage * faqsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - faqsPerPage;
  const searchedFAQs = !searchTerm
    ? updatedFAQArray?.slice(indexOfFirstQuestion, indexOfLastQuestion)
    : updatedFAQArray?.filter(
        (items) => items?.question?.toLowerCase().includes(searchTerm)
      ); // get search results based on data

  // display FAQs
  const FAQs = ({ items }) => {
    return (
      <ul className="space-y-4 lg:space-y-6">
        {items?.map((faq, index) => (
          <li className="rounded bg-gray-50 p-6 shadow" key={index}>
            <button
              aria-label={faq?.question}
              className="font-heading flex w-full items-center justify-between border-none text-left font-bold hover:text-gray-600 focus:outline-none"
              onClick={() => toggleView(index + indexOfFirstQuestion)}
            >
              <span className="text-xl">{faq?.question}</span>
              <svg
                className="h-4 w-4 text-webriq-darkblue"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    show && activeTab === index
                      ? "M5 10l7-7m0 0l7 7m-7-7v18"
                      : "M19 14l-7 7m0 0l-7-7m7 7V3"
                  }
                />
              </svg>
            </button>
            {show && activeTab === index && (
              <p
                className={`mt-4 font-normal leading-loose text-gray-500 ${
                  !show && "hidden"
                }`}
              >
                {faq?.answer}
              </p>
            )}
          </li>
        ))}
      </ul>
    );
  };

  // pagination
  const Pagination = ({ faqsPerPage, totalFaqs, changePage }) => {
    const pageButtons = [];

    for (let i = 1; i <= Math.ceil(totalFaqs / faqsPerPage); i++) {
      pageButtons.push(i);
    }

    return (
      <div className="mb-16 flex justify-center space-x-4">
        {pageButtons?.map((buttonNumber) => (
          <button
            aria-label={`Page ${buttonNumber}`}
            key={buttonNumber}
            className="inline-block h-2 w-2 rounded-full bg-webriq-blue"
            onClick={() => changePage(buttonNumber)}
          />
        ))}
      </div>
    );
  };

  // change page
  const changePage = (buttonNumber) => setCurrentPage(buttonNumber);

  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <span className="font-heading font-bold text-webriq-darkblue">
              {subtitle}
            </span>
            <h1 className="font-heading mb-6 text-5xl font-bold">{title}</h1>
            {updatedFAQArray && updatedFAQArray?.length > 1 && (
              <form className="flex justify-center">
                <input
                  aria-label="Search, find any question you want to ask..."
                  className="font-heading w-2/3 rounded-l bg-white p-4 text-xs focus:border-gray-500 focus:outline-none"
                  placeholder="Search, find any question you want to ask..."
                  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                />
                <button
                  aria-label="Search button"
                  className="rounded-r-lg bg-white pr-4 text-webriq-darkblue"
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={"M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"}
                    />
                  </svg>
                </button>
              </form>
            )}
          </div>
          {!searchTerm && updatedFAQArray?.length > 6 && (
            <Pagination
              faqsPerPage={faqsPerPage}
              totalFaqs={updatedFAQArray?.length}
              changePage={changePage}
            />
          )}
          <div className="mx-auto max-w-3xl">
            <ul className="space-y-4 lg:space-y-6">
              {updatedFAQArray && <FAQs items={searchedFAQs} />}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
