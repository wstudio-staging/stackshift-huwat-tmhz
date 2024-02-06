import React from "react";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import {
  LabeledRoute,
  LabeledRouteWithKey,
  Logo,
  MyPortableTextComponents,
} from "types";

interface ConditionalLinkTypes {
  className?: string;
  ariaLabel: string; // required for A11Y
  style?: any;
  children: string | React.ReactNode;
  link: LabeledRoute | LabeledRouteWithKey | undefined;
  target?: string;
}

// WebriQ form redirect thank you page on successful submission
export const thankYouPageLink = (link) => {
  if (!link) {
    return "/thank-you";
  } else {
    if (link?.linkType === "linkInternal") {
      return `/${link?.internalLink}`;
    } else {
      return link?.externalLink;
    }
  }
};

// Logo link
export const logoLink = (logo: Logo) => {
  if (logo?.internalLink && logo?.type === "linkInternal") {
    if (logo?.internalLink?.toLowerCase()?.includes("home")) {
      return "/";
    }
    return `/${logo.internalLink}`;
  } else if (logo?.externalLink && logo?.type === "linkExternal") {
    return logo?.externalLink ?? "/";
  } else {
    return "/";
  }
};

// Conditional Link
export const ConditionalLink = ({
  className,
  ariaLabel,
  style = {},
  children,
  link,
  target,
}: ConditionalLinkTypes) => {
  const defaultStyle =
    "inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200";

  if (!link?.internalLink && !link?.externalLink) {
    return (
      <a
        className={className ?? defaultStyle}
        aria-label={ariaLabel}
        //style={style}
        target={target}
        href="/page-not-found"
      >
        {children}
      </a>
    );
  } else if (
    link?.type === "linkInternal" &&
    link?.internalLink?.toLowerCase()?.includes("home")
  ) {
    return (
      <Link
        href="/"
        aria-label={ariaLabel}
        className={className ?? defaultStyle}
        //style={style}
        target={target}
      >
        {children}
      </Link>
    );
  } else if (link?.type === "linkInternal") {
    return (
      <Link
        href={`/${link?.internalLink}`}
        aria-label={ariaLabel}
        className={className ?? defaultStyle}
        //style={style}
        target={target}
      >
        {children}
      </Link>
    );
  } else if (link?.type === "linkExternal") {
    return (
      <a
        aria-label={ariaLabel}
        className={className ?? defaultStyle}
        //style={style}
        href={link?.externalLink}
        target={target}
        rel={link?.linkTarget === "_blank" ? "noopener noreferrer" : null}
      >
        {children}
      </a>
    );
  } else {
    return (
      <Link
        href="/"
        aria-label={ariaLabel}
        className={className ?? defaultStyle}
        //style={style}
        target={target}
      >
        {children}
      </Link>
    );
  }
};

export const defaultBlockStyle: MyPortableTextComponents = {
  block: {
    h1: ({ children }) => {
      return (
        <h1 className="mb-6 text-7xl leading-loose text-gray-900">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      return (
        <h2 className="mb-6 text-5xl leading-loose text-gray-900">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      return (
        <h3 className="mb-6 text-3xl leading-loose text-gray-900">
          {children}
        </h3>
      );
    },
    h4: ({ children }) => {
      return (
        <h4 className="mb-6 text-xl leading-loose text-gray-900">{children}</h4>
      );
    },
    normal: ({ children }) => {
      return (
        <p className="mb-6 text-justify leading-loose text-gray-900">
          {children}
        </p>
      );
    },
    blockquote: ({ children }) => {
      return (
        <blockquote className="mb-6 px-14 italic leading-loose text-gray-500">
          - {children}
        </blockquote>
      );
    },
  },
  code: ({ value }) => {
    return (
      <pre data-language={value.language}>
        <code>{value.code}</code>
      </pre>
    );
  },
  list: {
    bullet: ({ children }) => {
      return (
        <ul className="mb-6 list-disc pl-10 leading-loose text-gray-900">
          {children}
        </ul>
      );
    },
    number: ({ children }) => {
      return (
        <ol className="mb-6 list-decimal leading-loose text-gray-900">
          {children}
        </ol>
      );
    },
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-6 leading-loose text-gray-900">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => (
      <a
        className="hover:text-webriq-darkorange text-webriq-lightorange"
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    addImage: ({ value }) => (
      <Image
        className="mb-5 h-full w-full"
        width={500}
        height={500}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={urlFor(value?.image)}
        alt={value?.alt ?? value?.image?.asset?._ref}
      />
    ),
  },
};
