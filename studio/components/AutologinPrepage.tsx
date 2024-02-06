import Image from "next/image";

export default function AutologinPrepage({ status }) {
  if (status === "retry") {
    return (
      <div className="py-24 text-center justify-center h-full">
        <Image
          className="mx-auto"
          src="/webriq-logo-lg.png"
          alt="WebriQ Logo"
          width={50}
          height={50}
          quality={100}
        />
        <h1 className="font-bold text-lg sm:text-2xl mt-8 mb-5">
          Logging in to Stackshift UI
        </h1>
        <p className="animate-pulse text-md text-gray-500">Please wait...</p>
      </div>
    );
  }

  return (
    <div className="py-20 text-center justify-center h-full">
      <Image
        className="mx-auto"
        src="/webriq-logo-lg.png"
        alt="WebriQ Logo"
        width={50}
        height={50}
        quality={100}
      />
      <h1 className="font-bold text-lg sm:text-2xl mt-8 mb-5">
        Oops, unable to autologin!
      </h1>
      <p className="text-md text-gray-500">
        Please notify WebriQ about this issue...
      </p>
    </div>
  );
}
