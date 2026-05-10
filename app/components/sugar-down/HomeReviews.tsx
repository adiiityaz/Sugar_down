import {useCallback, useEffect, useState} from 'react';

type Review = {
  initials: string;
  name: string;
  meta: string;
  headline: string;
  body: string;
  gradient: string;
};

const REVIEWS: Review[] = [
  {
    initials: 'RS',
    name: 'Ramesh Sharma',
    meta: 'Age 54 · Lucknow, UP',
    headline: '"Fasting sugar 186 → 109 in 45 days"',
    body: 'I tried many products before. Nothing worked like this complete system. The morning juice + capsules + sleep capsule together changed everything. Daily follow-up kept me on track.',
    gradient: 'linear-gradient(135deg,#1B4D2E,#2E7D4F)',
  },
  {
    initials: 'PM',
    name: 'Priya Mehta',
    meta: 'Age 48 · Pune, Maharashtra',
    headline: '"Sleeping full nights for the first time in years"',
    body: 'The Sleep Capsules are something else. I was waking up 3-4 times every night. Now I sleep straight through and my morning fasting sugar is better than it\'s been in 4 years.',
    gradient: 'linear-gradient(135deg,#2a5a8c,#1a3a5c)',
  },
  {
    initials: 'SP',
    name: 'Suresh Patel',
    meta: 'Age 61 · Ahmedabad, Gujarat',
    headline: '"HbA1c dropped 8.4 → 6.7. Doctor was shocked."',
    body: '90 days with the Balanced Kit and staying consistent. My doctor asked what I changed. When I told him, he said keep going. Zero side effects, completely natural.',
    gradient: 'linear-gradient(135deg,#5c3a1a,#8c5a2a)',
  },
  {
    initials: 'AV',
    name: 'Anita Verma',
    meta: 'Age 52 · Delhi',
    headline: '"No more 2 PM crash. Energy fully restored."',
    body: 'I was useless after lunch every day. One month of Core Kit and I work straight through till evening. The WhatsApp team replied at 11pm once — that level of support is rare.',
    gradient: 'linear-gradient(135deg,#5a1a6b,#3a0f4a)',
  },
  {
    initials: 'MK',
    name: 'Mahesh Kumar',
    meta: 'Age 58 · Jaipur, Rajasthan',
    headline: '"Doctor reduced my insulin dose after 60 days"',
    body: '8 years diabetic. After 60 days on Sugar Down my doctor himself reduced my insulin dose. I still take allopathic medicine but this works perfectly alongside it. The daily support also helps a lot.',
    gradient: 'linear-gradient(135deg,#1a5c3a,#0d3a22)',
  },
  {
    initials: 'SG',
    name: 'Sunita Gupta',
    meta: 'Age 50 · Kanpur, UP',
    headline: '"My husband and I both saw results together"',
    body: 'We both started Sugar Down together. Both of us improved in 45 days. The fact this brand ONLY focuses on diabetes gives me total confidence. We recommended it to our whole family.',
    gradient: 'linear-gradient(135deg,#7a3a00,#4a2200)',
  },
  {
    initials: 'VS',
    name: 'Vijay Singh',
    meta: 'Age 56 · Bhopal, MP',
    headline: '"Post-meal sugar spikes completely stopped"',
    body: 'My sugar used to shoot to 240+ after every meal. After 3 weeks of taking the capsules before lunch and dinner, it stays under 160. The difference is very clear. Simple and effective.',
    gradient: 'linear-gradient(135deg,#003a5c,#001f3a)',
  },
  {
    initials: 'KJ',
    name: 'Kavita Joshi',
    meta: 'Age 45 · Nashik, Maharashtra',
    headline: '"Weight also came down along with sugar"',
    body: 'I wasn\'t expecting this but along with sugar control I also lost 4kg in 60 days. Staying consistent with the system was so practical and easy to follow. I feel lighter and more active every single day now.',
    gradient: 'linear-gradient(135deg,#2d5a1a,#1a3a0a)',
  },
  {
    initials: 'AM',
    name: 'Arun Mishra',
    meta: 'Age 63 · Varanasi, UP',
    headline: '"Even my tingling feet problem reduced"',
    body: 'I had diabetic neuropathy — constant tingling in my feet. After 2 months of Sugar Down with the diet plan, my feet feel much better. My sugar is also more stable. This is the most complete solution I have used in 10 years.',
    gradient: 'linear-gradient(135deg,#1a1a5c,#0d0d3a)',
  },
  {
    initials: 'RD',
    name: 'Rekha Devi',
    meta: 'Age 59 · Patna, Bihar',
    headline: '"Stopped craving sweets completely after 2 weeks"',
    body: 'The Gurmar herb in the capsules is real. My craving for mithai and sweet chai completely stopped within 2 weeks. That alone changed everything. My sugar is now under control and I don\'t even miss sweets anymore.',
    gradient: 'linear-gradient(135deg,#3a001a,#1a000d)',
  },
];

type SlideState = {current: number; exiting: number | null};

export function HomeReviews() {
  const [slide, setSlide] = useState<SlideState>({
    current: 0,
    exiting: null,
  });

  useEffect(() => {
    if (slide.exiting === null) return;
    const t = window.setTimeout(() => {
      setSlide((s) => ({...s, exiting: null}));
    }, 600);
    return () => clearTimeout(t);
  }, [slide.exiting]);

  const goTo = useCallback((rawNext: number) => {
    const n = REVIEWS.length;
    const next = ((rawNext % n) + n) % n;
    setSlide((s) => {
      if (s.current === next) return s;
      return {current: next, exiting: s.current};
    });
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((s) => {
        const n = REVIEWS.length;
        const next = (s.current + 1) % n;
        return {current: next, exiting: s.current};
      });
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const cardClass = (i: number) => {
    const n = REVIEWS.length;
    const {current, exiting} = slide;
    if (exiting !== null && i === exiting) return 'review-stack-card exit';
    if (i === current) return 'review-stack-card active';
    if (i === (current + 1) % n) return 'review-stack-card next-1';
    if (i === (current + 2) % n) return 'review-stack-card next-2';
    return 'review-stack-card';
  };

  return (
    <section
      id="reviews"
      style={{background: '#0F1A13', padding: '72px 6% 56px'}}
      aria-roledescription="carousel"
      aria-label="Customer testimonials"
    >
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{textAlign: 'center', marginBottom: '64px'}}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 700,
              color: '#C8972A',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
            }}
            className="fade-up"
          >
            Real People. Real Results.
          </span>
          <h2
            style={{
              fontFamily: "'Playfair Display',serif",
              fontSize: 'clamp(32px,4vw,48px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.2,
              marginBottom: '16px',
            }}
            className="fade-up fade-up-d1"
          >
            Many Lives Changed.
            <br />
            <span style={{color: '#4CAF7D'}}>Could Yours Be Next?</span>
          </h2>
          <p
            style={{
              fontSize: '17px',
              color: 'rgba(255,255,255,0.5)',
              maxWidth: '520px',
              margin: '0 auto',
            }}
            className="fade-up fade-up-d2"
          >
            Every person below was struggling with diabetes. They gave Sugar Down
            a chance. Here is what happened.
          </p>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '16px',
              marginTop: '28px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '50px',
              padding: '12px 28px',
            }}
          >
            <div style={{textAlign: 'left'}}>
              <div
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: '36px',
                  fontWeight: 900,
                  color: '#fff',
                  lineHeight: 1,
                }}
              >
                4.9
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: '2px',
                }}
              >
                out of 5
              </div>
            </div>
            <div
              style={{
                width: '1px',
                height: '40px',
                background: 'rgba(255,255,255,0.15)',
              }}
            />
            <div>
              <div
                style={{
                  color: '#F5A623',
                  fontSize: '18px',
                  letterSpacing: '3px',
                }}
              >
                ★★★★★
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: '4px',
                }}
              >
                Based on customer reviews
              </div>
            </div>
          </div>
        </div>

        <div className="reviews-slider-container">
          <div
            className="reviews-slider-inner"
            onClick={() => goTo(slide.current + 1)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                goTo(slide.current + 1);
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Show next testimonial"
          >
            {REVIEWS.map((r, i) => (
              <article key={r.name} className={cardClass(i)}>
                <div
                  style={{
                    position: 'relative',
                    background: r.gradient,
                    height: '220px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                  }}
                >
                  <div
                    style={{
                      width: '88px',
                      height: '88px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.15)',
                      border: '3px solid rgba(255,255,255,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '28px',
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    {r.initials}
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#C8972A',
                      color: '#000',
                      fontSize: '9px',
                      fontWeight: 800,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      letterSpacing: '0.5px',
                    }}
                  >
                    VERIFIED
                  </div>
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background:
                        'linear-gradient(transparent,rgba(0,0,0,0.6))',
                      padding: '16px 16px 12px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '15px',
                        fontWeight: 700,
                        color: '#fff',
                      }}
                    >
                      {r.name}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.6)',
                      }}
                    >
                      {r.meta}
                    </div>
                  </div>
                </div>
                <div style={{padding: '20px'}}>
                  <div
                    style={{
                      color: '#F5A623',
                      fontSize: '13px',
                      letterSpacing: '2px',
                      marginBottom: '8px',
                    }}
                  >
                    ★★★★★
                  </div>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#fff',
                      marginBottom: '8px',
                      lineHeight: 1.4,
                    }}
                  >
                    {r.headline}
                  </div>
                  <div
                    style={{
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.55)',
                      lineHeight: 1.6,
                      marginBottom: '14px',
                    }}
                  >
                    {r.body}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="slider-nav">
            <button
              type="button"
              className="nav-btn"
              aria-label="Previous testimonial"
              onClick={(e) => {
                e.stopPropagation();
                goTo(slide.current - 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              className="nav-btn"
              aria-label="Next testimonial"
              onClick={(e) => {
                e.stopPropagation();
                goTo(slide.current + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>

          <div className="slider-dots">
            {REVIEWS.map((review, i) => (
              <button
                key={`${review.initials}-${review.name}`}
                type="button"
                className={`dot${i === slide.current ? ' active' : ''}`}
                aria-label={`Go to testimonial ${i + 1}`}
                aria-current={i === slide.current ? true : undefined}
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(i);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
