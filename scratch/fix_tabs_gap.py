with open('frontend-react/src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    text = f.read()

# Panel 1 fix
old_p1 = '''              <div className="lg:col-span-6 relative min-h-[540px] bg-surface-dark overflow-hidden">
                <img
                  src="/images/Hero_1.jpg"
                  alt="Cylindrical commercial corporate headquarters"
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-65"
                />
                <div className="absolute inset-0 dot-matrix-overlay pointer-events-none"></div>

                {/* White Radial Target SVG Overlay */}
                <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                  <svg className="w-56 h-56 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <circle cx="80" cy="80" r="64"></circle>
                    <circle cx="80" cy="80" r="24"></circle>
                    <line x1="80" y1="16" x2="80" y2="144"></line>
                    <line x1="16" y1="80" x2="144" y2="80"></line>
                    <line x1="34.7" y1="34.7" x2="63" y2="63"></line>
                    <line x1="125.3" y1="34.7" x2="97" y2="63"></line>
                    <line x1="34.7" y1="125.3" x2="63" y2="97"></line>
                    <line x1="125.3" y1="125.3" x2="97" y2="97"></line>
                  </svg>
                </div>

                {/* Chamfered Right Edge Tab */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-8 h-64 bg-surface chamfer-split-left"></div>
              </div>'''

new_p1 = '''              <div className="lg:col-span-6 relative min-h-[540px] bg-surface-dark">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="/images/Hero_1.jpg"
                    alt="Cylindrical commercial corporate headquarters"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-65"
                  />
                  <div className="absolute inset-0 dot-matrix-overlay pointer-events-none"></div>

                  {/* White Radial Target SVG Overlay */}
                  <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                    <svg className="w-56 h-56 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="80" cy="80" r="64"></circle>
                      <circle cx="80" cy="80" r="24"></circle>
                      <line x1="80" y1="16" x2="80" y2="144"></line>
                      <line x1="16" y1="80" x2="144" y2="80"></line>
                      <line x1="34.7" y1="34.7" x2="63" y2="63"></line>
                      <line x1="125.3" y1="34.7" x2="97" y2="63"></line>
                      <line x1="34.7" y1="125.3" x2="63" y2="97"></line>
                      <line x1="125.3" y1="125.3" x2="97" y2="97"></line>
                    </svg>
                  </div>
                </div>

                {/* Chamfered Right Edge Tab (overlaps boundary by 2px to eliminate gap) */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-1 w-9 h-64 bg-surface chamfer-split-left z-20"></div>
              </div>'''

# Panel 2 fix
old_p2 = '''              <div className="lg:col-span-6 relative min-h-[540px] bg-surface-dark overflow-hidden order-1 lg:order-2">
                <img
                  src="/images/Land Development.jpg"
                  alt="Industrial automated manufacturing facility"
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60"
                />
                <div className="absolute inset-0 dot-matrix-overlay pointer-events-none"></div>

                {/* White Stepped Brackets SVG Overlay */}
                <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                  <svg className="w-56 h-56 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                    <path d="M52 40V24H24V136H52V120"></path>
                    <path d="M108 40V24H136V136H108V120"></path>
                    <path d="M64 54V40H38V120H64V106"></path>
                    <path d="M96 54V40H122V120H96V106"></path>
                    <path d="M76 66V54H52V106H76V94"></path>
                    <path d="M84 66V54H108V106H84V94"></path>
                    <rect x="66" y="66" width="28" height="28"></rect>
                  </svg>
                </div>

                {/* Chamfered Left Edge Tab */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-0 w-8 h-64 bg-surface chamfer-split-right"></div>
              </div>'''

new_p2 = '''              <div className="lg:col-span-6 relative min-h-[540px] bg-surface-dark order-1 lg:order-2">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="/images/Land Development.jpg"
                    alt="Industrial automated manufacturing facility"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60"
                  />
                  <div className="absolute inset-0 dot-matrix-overlay pointer-events-none"></div>

                  {/* White Stepped Brackets SVG Overlay */}
                  <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                    <svg className="w-56 h-56 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                      <path d="M52 40V24H24V136H52V120"></path>
                      <path d="M108 40V24H136V136H108V120"></path>
                      <path d="M64 54V40H38V120H64V106"></path>
                      <path d="M96 54V40H122V120H96V106"></path>
                      <path d="M76 66V54H52V106H76V94"></path>
                      <path d="M84 66V54H108V106H84V94"></path>
                      <rect x="66" y="66" width="28" height="28"></rect>
                    </svg>
                  </div>
                </div>

                {/* Chamfered Left Edge Tab (overlaps boundary by 2px to eliminate gap) */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-1 w-9 h-64 bg-surface chamfer-split-right z-20"></div>
              </div>'''

# Panel 3 fix
old_p3 = '''              <div className="lg:col-span-6 relative min-h-[540px] bg-surface-dark overflow-hidden">
                <img
                  src="/images/Transportation.jpg"
                  alt="Public transit and civil infrastructure project"
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60"
                />
                <div className="absolute inset-0 dot-matrix-overlay pointer-events-none"></div>

                {/* White Stepped Architectural Tower SVG Overlay */}
                <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                  <svg className="w-56 h-56 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                    <line x1="20" y1="130" x2="140" y2="130"></line>
                    <rect x="58" y="28" width="44" height="102" fill="#1C1C1B" fillOpacity="0.75"></rect>
                    <line x1="80" y1="28" x2="80" y2="130"></line>
                    <rect x="38" y="64" width="32" height="66" fill="#1C1C1B" fillOpacity="0.75"></rect>
                    <line x1="50" y1="64" x2="50" y2="130"></line>
                    <line x1="56" y1="64" x2="56" y2="130"></line>
                    <line x1="62" y1="64" x2="62" y2="130"></line>
                    <rect x="90" y="64" width="32" height="66" fill="#1C1C1B" fillOpacity="0.75"></rect>
                    <line x1="98" y1="64" x2="98" y2="130"></line>
                    <line x1="104" y1="64" x2="104" y2="130"></line>
                    <line x1="110" y1="64" x2="110" y2="130"></line>
                    <rect x="26" y="84" width="20" height="46" fill="#1C1C1B" fillOpacity="0.75"></rect>
                    <rect x="114" y="84" width="20" height="46" fill="#1C1C1B" fillOpacity="0.75"></rect>
                  </svg>
                </div>

                {/* Chamfered Right Edge Tab */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-0 w-8 h-64 bg-surface chamfer-split-left"></div>
              </div>'''

new_p3 = '''              <div className="lg:col-span-6 relative min-h-[540px] bg-surface-dark">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="/images/Transportation.jpg"
                    alt="Public transit and civil infrastructure project"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60"
                  />
                  <div className="absolute inset-0 dot-matrix-overlay pointer-events-none"></div>

                  {/* White Stepped Architectural Tower SVG Overlay */}
                  <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                    <svg className="w-56 h-56 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                      <line x1="20" y1="130" x2="140" y2="130"></line>
                      <rect x="58" y="28" width="44" height="102" fill="#1C1C1B" fillOpacity="0.75"></rect>
                      <line x1="80" y1="28" x2="80" y2="130"></line>
                      <rect x="38" y="64" width="32" height="66" fill="#1C1C1B" fillOpacity="0.75"></rect>
                      <line x1="50" y1="64" x2="50" y2="130"></line>
                      <line x1="56" y1="64" x2="56" y2="130"></line>
                      <line x1="62" y1="64" x2="62" y2="130"></line>
                      <rect x="90" y="64" width="32" height="66" fill="#1C1C1B" fillOpacity="0.75"></rect>
                      <line x1="98" y1="64" x2="98" y2="130"></line>
                      <line x1="104" y1="64" x2="104" y2="130"></line>
                      <line x1="110" y1="64" x2="110" y2="130"></line>
                      <rect x="26" y="84" width="20" height="46" fill="#1C1C1B" fillOpacity="0.75"></rect>
                      <rect x="114" y="84" width="20" height="46" fill="#1C1C1B" fillOpacity="0.75"></rect>
                    </svg>
                  </div>
                </div>

                {/* Chamfered Right Edge Tab (overlaps boundary by 2px to eliminate gap) */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -right-1 w-9 h-64 bg-surface chamfer-split-left z-20"></div>
              </div>'''

# Panel 4 fix
old_p4 = '''              <div className="lg:col-span-6 relative min-h-[540px] bg-surface-dark overflow-hidden order-1 lg:order-2">
                <img
                  src="/images/Rail Services.jpg"
                  alt="Large-scale port and engineering construction project"
                  className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60"
                />
                <div className="absolute inset-0 dot-matrix-overlay pointer-events-none"></div>

                {/* White Graduated Crosshair & Quadrant Nodes SVG Overlay */}
                <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                  <svg className="w-56 h-56 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                    <line x1="80" y1="28" x2="80" y2="132"></line>
                    <line x1="74" y1="28" x2="86" y2="28"></line>
                    <line x1="74" y1="132" x2="86" y2="132"></line>
                    <line x1="76" y1="39" x2="84" y2="39"></line>
                    <line x1="76" y1="49" x2="84" y2="49"></line>
                    <line x1="76" y1="59" x2="84" y2="59"></line>
                    <line x1="76" y1="69" x2="84" y2="69"></line>
                    <line x1="76" y1="91" x2="84" y2="91"></line>
                    <line x1="76" y1="101" x2="84" y2="101"></line>
                    <line x1="76" y1="111" x2="84" y2="111"></line>
                    <line x1="76" y1="121" x2="84" y2="121"></line>
                    <line x1="28" y1="80" x2="132" y2="80"></line>
                    <line x1="28" y1="74" x2="28" y2="86"></line>
                    <line x1="132" y1="74" x2="132" y2="86"></line>
                    <line x1="39" y1="76" x2="39" y2="84"></line>
                    <line x1="49" y1="76" x2="49" y2="84"></line>
                    <line x1="59" y1="76" x2="59" y2="84"></line>
                    <line x1="69" y1="76" x2="69" y2="84"></line>
                    <line x1="91" y1="76" x2="91" y2="84"></line>
                    <line x1="101" y1="76" x2="101" y2="84"></line>
                    <line x1="111" y1="76" x2="111" y2="84"></line>
                    <line x1="121" y1="76" x2="121" y2="84"></line>
                    <circle cx="42" cy="44" r="6"></circle>
                    <circle cx="106" cy="54" r="6"></circle>
                    <circle cx="54" cy="106" r="6"></circle>
                    <circle cx="128" cy="116" r="6"></circle>
                  </svg>
                </div>

                {/* Chamfered Left Edge Tab */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 left-0 w-8 h-64 bg-surface chamfer-split-right"></div>
              </div>'''

new_p4 = '''              <div className="lg:col-span-6 relative min-h-[540px] bg-surface-dark order-1 lg:order-2">
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src="/images/Rail Services.jpg"
                    alt="Large-scale port and engineering construction project"
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-60"
                  />
                  <div className="absolute inset-0 dot-matrix-overlay pointer-events-none"></div>

                  {/* White Graduated Crosshair & Quadrant Nodes SVG Overlay */}
                  <div className="relative z-10 h-full flex items-center justify-center p-gutter-xl">
                    <svg className="w-56 h-56 text-on-surface-dark" viewBox="0 0 160 160" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="square" aria-hidden="true">
                      <line x1="80" y1="28" x2="80" y2="132"></line>
                      <line x1="74" y1="28" x2="86" y2="28"></line>
                      <line x1="74" y1="132" x2="86" y2="132"></line>
                      <line x1="76" y1="39" x2="84" y2="39"></line>
                      <line x1="76" y1="49" x2="84" y2="49"></line>
                      <line x1="76" y1="59" x2="84" y2="59"></line>
                      <line x1="76" y1="69" x2="84" y2="69"></line>
                      <line x1="76" y1="91" x2="84" y2="91"></line>
                      <line x1="76" y1="101" x2="84" y2="101"></line>
                      <line x1="76" y1="111" x2="84" y2="111"></line>
                      <line x1="76" y1="121" x2="84" y2="121"></line>
                      <line x1="28" y1="80" x2="132" y2="80"></line>
                      <line x1="28" y1="74" x2="28" y2="86"></line>
                      <line x1="132" y1="74" x2="132" y2="86"></line>
                      <line x1="39" y1="76" x2="39" y2="84"></line>
                      <line x1="49" y1="76" x2="49" y2="84"></line>
                      <line x1="59" y1="76" x2="59" y2="84"></line>
                      <line x1="69" y1="76" x2="69" y2="84"></line>
                      <line x1="91" y1="76" x2="91" y2="84"></line>
                      <line x1="101" y1="76" x2="101" y2="84"></line>
                      <line x1="111" y1="76" x2="111" y2="84"></line>
                      <line x1="121" y1="76" x2="121" y2="84"></line>
                      <circle cx="42" cy="44" r="6"></circle>
                      <circle cx="106" cy="54" r="6"></circle>
                      <circle cx="54" cy="106" r="6"></circle>
                      <circle cx="128" cy="116" r="6"></circle>
                    </svg>
                  </div>
                </div>

                {/* Chamfered Left Edge Tab (overlaps boundary by 2px to eliminate gap) */}
                <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 -left-1 w-9 h-64 bg-surface chamfer-split-right z-20"></div>
              </div>'''

text = text.replace(old_p1, new_p1)
text = text.replace(old_p2, new_p2)
text = text.replace(old_p3, new_p3)
text = text.replace(old_p4, new_p4)

with open('frontend-react/src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(text)

print('Showcase tabs gap fixed successfully!')
