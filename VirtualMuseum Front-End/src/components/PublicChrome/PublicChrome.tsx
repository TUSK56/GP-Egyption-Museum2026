"use client";

import dynamic from 'next/dynamic';

const Footer = dynamic(() => import('../Footer/Footer'), {
  ssr: false,
  loading: () => null,
});

const FloatingButtons = dynamic(() => import('../FloatingButtons/FloatingButtons'), {
  ssr: false,
  loading: () => null,
});

export default function PublicChrome() {
  return (
    <>
      <Footer />
      <FloatingButtons />
    </>
  );
}