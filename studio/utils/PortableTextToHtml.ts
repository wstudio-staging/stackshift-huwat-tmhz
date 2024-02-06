// Reference: https://github.com/portabletext/to-html

import htm from "htm";
import vhtml from "vhtml";
import { toHTML, uriLooksSafe } from "@portabletext/to-html";

const html = htm.bind(vhtml);

const PortableTextComponents = {
  types: {
    image: ({ value }) => html`<img src="${value.imageUrl}" />`,
    // add custom block components here
  },

  marks: {
    link: ({ children, value }) => {
      // ⚠️ `value.href` IS NOT "SAFE" BY DEFAULT ⚠️
      // ⚠️ Make sure you sanitize/validate the href! ⚠️
      const href = value.href || "";

      if (uriLooksSafe(href)) {
        const rel = href.startsWith("/") ? undefined : "noreferrer noopener";
        return html`<a href="${href}" rel="${rel}">${children}</a>`;
      }

      // If the URI appears unsafe, render the children (eg, text) without the link
      return children;
    },
  },
};

export const PortableTextToHTML = (content) => {
  return toHTML(content, { components: PortableTextComponents });
};
