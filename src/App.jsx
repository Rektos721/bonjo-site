import Nav            from './components/Nav'
import Hero           from './components/Hero'
import TrustBar       from './components/TrustBar'
import HowItWorks     from './components/HowItWorks'
import About          from './components/About'
import Instructors    from './components/Instructors'
import Locations      from './components/Locations'
import Courses        from './components/Courses'
import Gallery        from './components/Gallery'
import Reviews        from './components/Reviews'
import Pricing        from './components/Pricing'
import FAQ            from './components/FAQ'
import FinalCTA       from './components/FinalCTA'
import Contact        from './components/Contact'
import Footer         from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import GlobalClouds   from './components/GlobalClouds'

export default function App() {
  return (
    <div style={{ position: 'relative' }}>
      <div className="noise" aria-hidden="true" />
      <GlobalClouds />
      <Nav />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <About />
      <Instructors />
      <Locations />
      <Courses />
      <Gallery />
      <Reviews />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Contact />
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
