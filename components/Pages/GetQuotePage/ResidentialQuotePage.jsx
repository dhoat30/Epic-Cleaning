import Image from "next/image";
import Link from "next/link";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import GetQuoteForm from "@/components/UI/Forms/GetQuoteForm";
import BeforeAfterResults from "@/components/Pages/MoveOutCleaningQuotePage/BeforeAfterResults";
import styles from "./ResidentialQuotePage.module.scss";

const services = [
  {
    id: "deep-cleaning", title: "Deep & spring cleaning", label: "Deep cleaning",
    description: "A one-off refresh for the jobs that need more attention, whether you’re catching up on cleaning or getting ready for guests.",
    inclusions: "Detailed cleaning of kitchens, bathrooms and living areas, including skirting boards and accessible surfaces.",
    slug: "spring-cleaning-tauranga",
  },
  {
    id: "oven-cleaning", title: "Oven cleaning", label: "Oven cleaning",
    description: "Let us tackle the baked-on grease and burnt-on food. Book an oven clean on its own or request it alongside your house clean.",
    inclusions: "Deep cleaning of the oven interior, removable racks and trays, plus the oven door and glass.",
    slug: "oven-cleaning-tauranga",
  },
  {
    id: "window-cleaning", title: "Window cleaning", label: "Window cleaning",
    description: "Bring more light into your home with professional interior and exterior window cleaning in Tauranga and surrounding areas.",
    inclusions: "Window glass, frames, sills and tracks. Tell us about access and any hard-water stains so we can quote accurately.",
    slug: "window-cleaning-tauranga",
  },
  {
    id: "carpet-cleaning", title: "Carpet & upholstery cleaning", label: "Carpet cleaning",
    description: "Refresh well-used carpets and furniture with professional cleaning for everyday grime, spills and high-traffic areas.",
    inclusions: "Carpet extraction cleaning and upholstery care, with stain and odour treatment assessed for your needs.",
    slug: "carpet-cleaning-tauranga",
  },
  {
    id: "move-out-cleaning", title: "Move-out & tenancy cleaning", label: "Move-out cleaning",
    description: "Moving home or preparing a rental? Get help with an end-of-tenancy clean tailored to your property and moving date.",
    inclusions: "Kitchen, bathroom and living-area cleaning. Request ovens, windows and carpets as part of your quote.",
    slug: "move-out-cleaning",
  },
  {
    id: "house-cleaning", title: "Regular house cleaning", label: "House cleaning",
    description: "A clean home that fits your routine. Choose weekly, fortnightly or monthly visits for help with the everyday cleaning.",
    inclusions: "Kitchen surfaces, bathrooms, dusting, vacuuming and mopping, with a checklist agreed for your home.",
    slug: "regular-cleaning-tauranga",
  },
];

const faqs = [
  {
    question: "How much does house cleaning in Tauranga cost?",
    answer: "Your quote depends on your home’s size, its condition, the tasks you need and how often you’d like us to visit. Include your bedrooms, bathrooms and priorities in the message. We’ll confirm the cleaning scope and price with you before you book; a home visit may be needed for an accurate assessment.",
  },
  {
    question: "Can I get a quote just for oven or window cleaning?",
    answer: "Yes. You can request either service on its own or combine it with other home cleaning. For oven cleaning, tell us the oven type and condition. For window cleaning prices, let us know the number of windows, storeys, access and whether you need the inside, outside or both. Hard-water stain removal is assessed and quoted separately.",
  },
  {
    question: "Do you have house cleaners in Papamoa and Mount Maunganui?",
    answer: "Yes. Epic Cleaning serves homes across Tauranga, Papamoa and Mount Maunganui, including Pyes Pa and surrounding areas. Add your suburb or property address to your enquiry so we can confirm availability for your location.",
  },
  {
    question: "What happens after I request a quote?",
    answer: "Our team will review your enquiry and contact you to discuss the services, property details and timing. We’ll confirm your quote and any assessment needed. Sending an enquiry is free and doesn’t commit you to a booking.",
  },
];

export default function ResidentialQuotePage({ stats, contactInfo, beforeAfterItems = [] }) {
  const rating = stats?.items?.find((item) => item.label?.toLowerCase().includes("rating"));
  const properties = stats?.items?.find((item) => item.label?.toLowerCase().includes("properties"));
  const phone = contactInfo?.info?.find((item) => item.url?.startsWith("tel:"));

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="quote-heading">
        <div className={`${styles.container} ${styles.heroGrid}`}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>YOUR LOCAL RESIDENTIAL CLEANING TEAM</p>
            <h1 id="quote-heading">House cleaning services in <span>Tauranga.</span></h1>
            <p className={styles.lead}>A cleaner home. More time for you.</p>
            <p className={styles.description}>From regular home cleaning to a deep oven clean, fresh carpets or sparkling windows, Epic Cleaning takes care of the jobs you need done. Serving Tauranga, Papamoa and Mount Maunganui.</p>
            <nav className={styles.serviceNav} aria-label="Explore our home cleaning services">
              {services.map((service) => <a href={`#${service.id}`} key={service.id}><CheckRoundedIcon aria-hidden="true" />{service.label}</a>)}
            </nav>
            <div className={styles.actions}>
              <a href="#quote-form" className={styles.primaryButton}>Get my free quote <ArrowForwardRoundedIcon aria-hidden="true" /></a>
              {phone && <a href={phone.url} className={styles.phoneLink}>Call {phone.label}</a>}
            </div>
            <div className={styles.proof}>
              {rating && <Link href="/testimonials"><span className={styles.stars} aria-hidden="true">★★★★★</span><strong>{rating.value}</strong> Google rating</Link>}
              {properties && <span><strong>{properties.value.trim()}</strong> properties cleaned</span>}
            </div>
            <figure className={styles.heroImage}>
              <Image
                src="https://cms.epiccleaning.co.nz/wp-content/uploads/2024/09/MVI_0776.00_27_26_26.Still034-1.jpg"
                alt="Epic Cleaning professional wiping a sliding door frame during a home deep clean"
                fill
                priority
                sizes="(max-width: 900px) calc(100vw - 40px), (max-width: 1280px) 50vw, 640px"
              />
              <figcaption>Professional care for the place you call home.</figcaption>
            </figure>
          </div>
          <aside id="quote-form" className={styles.formCard} aria-labelledby="form-title" tabIndex={-1}>
            <div className={styles.formHeader}>
              <h2 id="form-title">Get Your Free Quote</h2>
              <p>Tell us what you need. No obligation whatsoever.</p>
            </div>
            <div className={styles.formBenefit}><AccessTimeRoundedIcon aria-hidden="true" /><span>A cleaner home. Friendly, local service.</span></div>
            <GetQuoteForm className={`row-max form-component ${styles.quoteForm}`} fullWidthSubmit submitLabel="Submit" />
            <div className={styles.formFooter}>
              <p className={styles.privacyNote}><LockOutlinedIcon aria-hidden="true" /><span>Your details are private. No spam, ever.</span></p>
              {phone && <p className={styles.phonePrompt}><span>Prefer to talk?</span><a href={phone.url}><PhoneRoundedIcon aria-hidden="true" />{phone.label}</a></p>}
              <div className={styles.formTrustList}>
                <span><GppGoodOutlinedIcon aria-hidden="true" />$10M insured</span>
                <span><VerifiedOutlinedIcon aria-hidden="true" />IICRC certified</span>
                <span><AccessTimeRoundedIcon aria-hidden="true" />Fast response</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
      <section className={styles.services} aria-labelledby="services-heading">
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>ONE LOCAL TEAM. A HOME THAT FEELS CLEAN.</p>
            <h2 id="services-heading">What can we take off your list?</h2>
            <p>Choose a single service or ask us to combine a few. We’ll agree on the tasks and inclusions for your home before the work begins.</p>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service, index) => (
              <article key={service.id} id={service.id} className={styles.serviceCard}>
                <span className={styles.serviceNumber}>0{index + 1}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p className={styles.inclusions}>{service.inclusions}</p>
                <Link href={`/residential-cleaning/${service.slug}`}>Explore {service.label.toLowerCase()} <ArrowForwardRoundedIcon aria-hidden="true" /></Link>
              </article>
            ))}
          </div>
          <p className={styles.moreServices}>Need something else? We also offer <Link href="/residential-cleaning/exterior-house-washing-tauranga">exterior house washing</Link>, <Link href="/residential-cleaning/tile-and-grout-cleaning-tauranga">tile and grout cleaning</Link>, <Link href="/residential-cleaning/builders-cleaning-tauranga">builders cleaning</Link> and <Link href="/residential-cleaning/shower-glass-protection">shower glass treatment</Link>.</p>
        </div>
      </section>
      {beforeAfterItems.length > 0 && (
        <div className={styles.results}>
          <BeforeAfterResults
            items={beforeAfterItems}
            title="See the difference an Epic clean makes"
            description="Real before-and-after results from our work. Drag the handle on each photo to compare the clean, or use the arrow keys when the handle is selected."
          />
          <Link href="/our-work/gallery" className={styles.galleryLink}>See more of our work <ArrowForwardRoundedIcon aria-hidden="true" /></Link>
        </div>
      )}
      <section className={styles.process} aria-labelledby="process-heading">
        <div className={`${styles.container} ${styles.processGrid}`}>
          <div>
            <p className={styles.eyebrow}>A QUOTE THAT FITS YOUR HOME</p>
            <h2 id="process-heading">Tell us the jobs.<br />We’ll work out the details.</h2>
            <p>Every home is different. Your cleaning quote reflects the size, condition and services you choose, so you know what’s included.</p>
            <a href="#quote-form" className={styles.lightButton}>Request a free quote <ArrowForwardRoundedIcon aria-hidden="true" /></a>
          </div>
          <ol className={styles.steps}>
            <li><span>1</span><div><h3>Tell us about your home</h3><p>Share the services you need, your suburb and any preferred dates.</p></div></li>
            <li><span>2</span><div><h3>Get your tailored quote</h3><p>We’ll discuss your priorities and confirm the scope, price and availability.</p></div></li>
            <li><span>3</span><div><h3>Leave the cleaning to us</h3><p>Once you’re happy with the quote, we’ll arrange your clean.</p></div></li>
          </ol>
        </div>
      </section>
      <section className={styles.faq} aria-labelledby="faq-heading">
        <div className={`${styles.container} ${styles.faqGrid}`}>
          <div><p className={styles.eyebrow}>A FEW HELPFUL ANSWERS</p><h2 id="faq-heading">Home cleaning,<br />made clear.</h2><p>Looking for cleaners near you? Our local team helps households across Tauranga, Papamoa and Mount Maunganui.</p>{phone && <a className={styles.phoneLink} href={phone.url}>Talk to us: {phone.label}</a>}</div>
          <div className={styles.faqList}>{faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div>
        </div>
      </section>
    </div>
  );
}
