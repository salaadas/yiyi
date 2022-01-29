import React, { AnchorHTMLAttributes } from 'react';
import ReactLinkify from 'react-linkify';

const componentDecorator = (
  href: string | undefined,
  text: string,
  key: React.Key | null | undefined
) => (
  <a
    href={href}
    key={key}
    target={'_blank'}
    className="font-semibold text-custom-heading-secondary underline hover:text-green-700"
  >
    {text}
  </a>
);

export const Linkify = (props: any) => {
  return <ReactLinkify {...props} componentDecorator={componentDecorator} />;
};
