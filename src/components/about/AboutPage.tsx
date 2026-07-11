import Hero from './Hero'
import Mission from './Mission'
import Team from './Team'
import Nav from '@/components/shared/Nav'
import Footer from '@/components/shared/Footer'
import styles from './About.module.css'

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <Nav />
      <Hero />
      <Mission />
      <Team />
      <Footer />
    </div>
  )
}

export default AboutPage
