import React from 'react';

export default function Popup({ label, text, path }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <section className="bg-white rounded-3xl shadow-2xl p-8 text-center sm:p-12">
        <p className="text-sm font-semibold uppercase tracking-widest text-pink-500">
          {label}
        </p>

        <h2 className="mt-6 text-3xl font-bold">
          {text}
        </h2>

        <a
          className="mt-8 inline-block w-full rounded-full bg-pink-600 py-4 text-sm font-bold text-white shadow-xl"
          href={path}
        >
          Back
        </a>
      </section>
    </div>
  );
}
