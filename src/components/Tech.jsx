import { BallCanvas } from './canvas';
import { color, motion } from 'framer-motion';
import { SectionWrapper } from '../hoc';
import { technologies } from '../constants';
import { textVariant } from '../utils/motion';
import { styles } from '../styles';


const Tech = () => {
  return (
    <>
      <motion.div variants = { textVariant() }>
        <p className = { styles.sectionSubText }>
          SKILLS AND TOOLS
        </p>
        <h2 className = { styles.sectionHeadText}>
          Toolbox and things
        </h2>
      </motion.div>
      <br></br>
      <div className = 'flex flex-row flex-wrap justify-center gap-10 hidden sm:flex'>
        { technologies.map((technology) => (
          <div className = 'w-28 h-28' key = { technology.name }>
            <BallCanvas icon = { technology.icon } />
          </div>
        )) }
      </div>
      <div className = 'flex flex-row flex-wrap justify-center gap-10 sm:hidden'>
        { technologies.map((technology) => (
          <div className = 'w-28 h-28' key = { technology.name }>
              <img className="absolute w-28 h-28 z-[999]" src = { technology.mobile } />
          </div>
        )) }
      </div>
    </>
  )
}

export default SectionWrapper(Tech, "");