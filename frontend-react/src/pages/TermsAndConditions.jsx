import React from 'react';
import { Link } from 'react-router-dom';

const TERMS_CLAUSES = [
  {
    index: '01',
    title: 'ACCEPTANCE OF TERMS',
    body:
      'By accessing and browsing the official portal of the Transportation Engineering & Planning (TEP) Research & Consultancy Cell, Department of Civil Engineering, SVNIT Surat, you agree to comply with these institutional terms of use and applicable Indian regulations.',
  },
  {
    index: '02',
    title: 'CONSULTANCY & TESTING ENGAGEMENTS',
    body:
      'Information published on this portal regarding engineering capabilities, IRC:SP:88 road safety audits, traffic volume studies, DPR proof-checking, and laboratory QA/QC tests is for general informational purposes. Formal consultancy assignments and material tests commence only upon execution of official SVNIT work orders, fee approvals, and signed scopes of work.',
  },
  {
    index: '03',
    title: 'TECHNICAL STANDARDS & DELIVERABLES',
    body:
      'All field investigations and technical reports are conducted in alignment with prevailing Indian Roads Congress (IRC) codes, Ministry of Road Transport & Highways (MoRTH) specifications, Indian Highway Capacity Manual (Indo-HCM), and BIS standards as specified in the project terms of reference. Independent findings reflect site conditions observed during the contracted audit period.',
  },
  {
    index: '04',
    title: 'INTELLECTUAL PROPERTY & PUBLICATIONS',
    body:
      'Technical documentation, survey methodologies, custom graphics, architectural diagrams, research briefs, and published works presented on this site remain the intellectual property of SVNIT Surat and respective faculty authors unless otherwise cited. Commercial reproduction or redistribution without prior written authorization is prohibited.',
  },
  {
    index: '05',
    title: 'LIMITATION OF WEBSITE LIABILITY',
    body:
      'While every effort is made to maintain current and accurate project listings, faculty directories, and laboratory accreditation details, SVNIT Surat and the TEP Research & Consultancy Cell do not warrant uninterrupted portal availability and reserve the right to update technical content without prior notice.',
  },
  {
    index: '06',
    title: 'GOVERNING JURISDICTION',
    body:
      'These Terms & Conditions and any disputes arising out of portal usage or institutional correspondence are governed by the laws of India, with exclusive jurisdiction vested in the competent courts of Surat, Gujarat.',
  },
];

export default function TermsAndConditions() {
  return (
    <>
      {/* PAGE HERO HEADER */}
      <section className="w-full border-b border-outline bg-surface">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl flex flex-col gap-gutter-md">
          <div className="flex flex-wrap items-center justify-between gap-gutter-md">
            <div className="flex items-center gap-gutter-sm">
              <span className="w-2.5 h-2.5 bg-brand-green rotate-45 shrink-0" aria-hidden="true" />
              <span className="font-label text-label-md uppercase text-on-surface-variant">
                LEGAL &amp; GOVERNANCE — TEP · SVNIT, SURAT
              </span>
            </div>
            <span className="font-label text-label-sm uppercase text-brand-green">
              UPDATED: NOVEMBER 2026
            </span>
          </div>

          <h1 className="font-display text-display-md-mobile lg:text-[42px] xl:text-[48px] lg:leading-[1.1] font-semibold tracking-tight uppercase text-on-surface">
            TERMS &amp; CONDITIONS
          </h1>

          <p className="font-body text-body-md text-on-surface-variant max-w-3xl text-pretty">
            Terms governing portal usage, statutory consultancy engagements, technical report intellectual property, and institutional jurisdiction for the TEP Research &amp; Consultancy Cell at SVNIT Surat.
          </p>
        </div>
      </section>

      {/* TERMS CLAUSES */}
      <section className="w-full bg-surface border-b border-outline">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl">
          <div className="border-t border-outline">
            {TERMS_CLAUSES.map((clause) => (
              <div
                key={clause.index}
                className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline py-gutter-xl gap-gutter-md items-start"
              >
                <div className="lg:col-span-1 font-label text-label-md text-brand-green font-semibold tabular-nums">
                  {clause.index} //
                </div>
                <div className="lg:col-span-4 font-headline text-headline-sm uppercase text-on-surface">
                  {clause.title}
                </div>
                <div className="lg:col-span-7 font-body text-body-md text-on-surface-variant leading-relaxed text-pretty">
                  {clause.body}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-gutter-xl flex flex-wrap items-center justify-between gap-gutter-md">
            <Link
              to="/privacy-policy"
              className="font-label text-label-sm uppercase text-brand-green hover:opacity-80 transition-opacity"
            >
              ← READ PRIVACY POLICY
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-sm uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors"
            >
              <span>CONTACT CONSULTANCY DESK</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* DARK CONSULTATION CTA BANNER ABOVE FOOTER */}
      <section
        id="consultation-cta"
        className="relative bg-surface-dark text-on-surface-dark overflow-hidden border-t border-outline-dark"
      >
        <img
          src="/images/Hero_3.jpg"
          alt="Infrastructure field crew and corridor construction reference"
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 brightness-50 opacity-45 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-surface-dark/80 via-surface-dark/50 to-surface-dark/80 pointer-events-none" />
        <div className="relative z-10 max-w-[1440px] mx-auto border-x border-outline-dark">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-4 p-gutter-xl border-b lg:border-r border-outline-dark">
              <p className="font-body text-body-sm uppercase leading-relaxed text-on-surface-dark max-w-xs text-pretty">
                PARTNER WITH A TEAM COMMITTED TO DELIVERING QUALITY, SAFETY, AND LONG-TERM VALUE &mdash; FROM GROUNDBREAKING TO COMPLETION.
              </p>
            </div>
            <div className="hidden lg:block lg:col-span-8 border-b border-outline-dark" />

            <div className="hidden lg:block lg:col-span-4 lg:border-r border-outline-dark min-h-[260px]" />
            <div className="lg:col-span-8 p-gutter-xl pb-20 flex flex-col justify-center items-start gap-gutter-lg min-h-[260px]">
              <h2 className="font-display text-display-md-mobile lg:text-display-lg uppercase leading-tight text-on-surface-dark max-w-2xl text-balance">
                BUILD WITH AN INDUSTRIALIZED AND DIGITAL SYSTEM
              </h2>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-gutter-md py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-surface hover:text-on-surface transition-colors duration-state-change ease-state-change"
              >
                <span>REQUEST A CONSULTATION</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
