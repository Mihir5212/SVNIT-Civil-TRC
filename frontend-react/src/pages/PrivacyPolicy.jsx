import React from 'react';
import { Link } from 'react-router-dom';

const SECTIONS = [
  {
    index: '01',
    title: 'SCOPE & INSTITUTIONAL COMMITMENT',
    body:
      'The Transportation Engineering & Planning (TEP) Research & Consultancy Cell, operating under the Department of Civil Engineering at Sardar Vallabhbhai National Institute of Technology (SVNIT), Surat, is committed to safeguarding the privacy and confidentiality of government agencies, public sector undertakings, private enterprises, researchers, and visitors using this portal.',
  },
  {
    index: '02',
    title: 'INFORMATION WE COLLECT',
    body:
      'When you submit a technical inquiry, material testing request, or consultancy brief through our Contact Us form, we collect only the details voluntarily provided—such as your full name, organization or government department, official email address, contact telephone number, corridor location, and project scope requirements. Our public browsing pages do not collect invasive personal tracking profiles.',
  },
  {
    index: '03',
    title: 'HOW SUBMITTED INFORMATION IS USED',
    body:
      'All submitted project and laboratory details are reviewed exclusively by authorized SVNIT faculty coordinators and project staff to prepare technical proposals, schedule road safety audits or traffic field surveys, issue NABL-aligned laboratory testing quotations, and respond to academic or institutional collaboration inquiries.',
  },
  {
    index: '04',
    title: 'PROJECT DATA & CLIENT CONFIDENTIALITY',
    body:
      'Detailed Project Reports (DPRs), corridor traffic counts, accident crash datasets, laboratory sample test results, and structural audit drawings shared during statutory consultancy engagements are handled in strict confidence under SVNIT consultancy norms. Client-proprietary datasets are never disclosed to unauthorized third parties without prior written consent or statutory mandate.',
  },
  {
    index: '05',
    title: 'ACADEMIC PUBLICATION & ANONYMIZATION',
    body:
      'Where empirical field observations contribute to peer-reviewed research papers, Indian Roads Congress (IRC) guideline calibration, or Indo-HCM updates, datasets are aggregated and anonymized so that sensitive site identifiers or client identities remain protected unless explicit institutional permission is granted.',
  },
  {
    index: '06',
    title: 'DATA RETENTION & CONTACT FOR PRIVACY REQUESTS',
    body:
      'Inquiry correspondence and statutory consultancy records are retained in accordance with Government of India and SVNIT institutional archival policies. To request correction or removal of contact details submitted via our portal, please contact our consultancy desk at trc@svnit.ac.in or tep-consultancy@ced.svnit.ac.in.',
  },
];

export default function PrivacyPolicy() {
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
              EFFECTIVE: NOVEMBER 2026
            </span>
          </div>

          <h1 className="font-display text-display-md-mobile lg:text-[42px] xl:text-[48px] lg:leading-[1.1] font-semibold tracking-tight uppercase text-on-surface">
            PRIVACY POLICY
          </h1>

          <p className="font-body text-body-md text-on-surface-variant max-w-3xl text-pretty">
            How the TEP Research &amp; Consultancy Cell at SVNIT Surat collects, protects, and governs technical inquiry records and statutory project datasets.
          </p>
        </div>
      </section>

      {/* POLICY CLAUSES */}
      <section className="w-full bg-surface border-b border-outline">
        <div className="max-w-[1440px] mx-auto p-gutter-lg lg:p-gutter-xl">
          <div className="border-t border-outline">
            {SECTIONS.map((sec) => (
              <div
                key={sec.index}
                className="grid grid-cols-1 lg:grid-cols-12 border-b border-outline py-gutter-xl gap-gutter-md items-start"
              >
                <div className="lg:col-span-1 font-label text-label-md text-brand-green font-semibold tabular-nums">
                  {sec.index} //
                </div>
                <div className="lg:col-span-4 font-headline text-headline-sm uppercase text-on-surface">
                  {sec.title}
                </div>
                <div className="lg:col-span-7 font-body text-body-md text-on-surface-variant leading-relaxed text-pretty">
                  {sec.body}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-gutter-xl flex flex-wrap items-center justify-between gap-gutter-md">
            <Link
              to="/terms-and-conditions"
              className="font-label text-label-sm uppercase text-brand-green hover:opacity-80 transition-opacity"
            >
              READ TERMS &amp; CONDITIONS →
            </Link>
            <Link
              to="/contact"
              className="chamfer-btn inline-flex items-center gap-gutter-sm bg-brand-green text-on-brand-green px-5 py-gutter-sm font-label text-label-sm uppercase tracking-wider hover:bg-primary hover:text-on-primary transition-colors"
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
                className="chamfer-btn inline-flex items-center justify-center gap-gutter-sm bg-brand-green text-on-brand-green px-5 py-gutter-sm font-label text-label-md uppercase tracking-wider hover:bg-surface hover:text-on-surface transition-colors duration-state-change ease-state-change"
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
