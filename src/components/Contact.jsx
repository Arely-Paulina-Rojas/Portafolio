import { useState, useRef} from 'react';
import { motion } from 'framer-motion';
import  emailjs from '@emailjs/browser';
import { styles } from '../styles';
/*import { GhostCanvas } from './canvas';*/
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';
import { CatCanvas } from './canvas';

const Contact = () => {
  const formRef = useRef();
  const [ form, setForm ] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [ loading, setLoading ] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if(form.name != "" && form.email != "" && form.message!= "") {
      emailjs.send(
        'service',
        'template',
        {
          from_name: form.name,
          to_name: 'Arely Paulina',
          from_email: form.email,
          to_email: 'rojas.arelypaulina@micorreo.upp.edu.mx',
          message: form.message
        },
        'public key'
      ).then(() => {
        setLoading(false);
        alert('Thank you. I will get back to you as soon as possible :)');
  
        setForm({
          name: '',
          email: '',
          message: ''
        })
      }, (error) => {
        setLoading(false);
        console.log(error);
        console.log(import.meta.env.TEMPLATE)
        alert('Something went wrong.')
      })
    } else {
      setLoading(false);
      alert('Empty fields!')

    }
    
  }

  return (
    <div className = 'xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden'>
      <motion.div variants = { slideIn('left', "tween", 0.2, 1) } className = 'flex-[0.75] bg-secondary p-8'>
        <p className = { styles.sectionSubText }>GET IN TOUCH</p>
        <h3 className = { styles.sectionHeadText }>Contact</h3>

        <form 
          ref = { formRef }
          onSubmit = { handleSubmit }
          className = 'mt-12 flex flex-col gap-8'
        >
          <label className = 'flex flex-col'>
              <span className = 'text-tertiary font-medium mb-4'>Your Name</span>
              <input
                type = 'text'
                name = 'name'
                value = { form.name }
                onChange = { handleChange }
                placeholder = "What's your name?"
                className = 'bg-primary py-4 px-6 placeholder:text-quaternary text-black oulined-none outline-none border-none font-medium' 
              />
          </label>
          <label className = 'flex flex-col'>
              <span className = 'text-tertiary font-medium mb-4'>Your Email</span>
              <input
                type = 'email'
                name = 'email'
                value = { form.email }
                onChange = { handleChange }
                placeholder = "What's your email?"
                className = 'bg-primary py-4 px-6 placeholder:text-quaternary text-black outlined-none outline-none border-none font-medium' 
              />
          </label>
          <label className = 'flex flex-col'>
              <span className = 'text-tertiary font-medium mb-4'>Your Message</span>
              <textarea
                rows = '7'
                name = 'message'
                value = { form.message }
                onChange = { handleChange }
                placeholder = "What do you want to say?"
                className = 'bg-primary py-4 px-6 placeholder:text-quaternary text-black outlined-none outline-none border-none font-medium' 
              />
          </label>

          <button className = 'bg-tertiary py-3 px-8 ouline-none w-fit text-white font-bold'>
            { loading ? 'Sending...' : 'Send' }
          </button>
        </form>
      </motion.div>

      <motion.div
        variants = { slideIn('right', "tween", 0.2) } className = 'xl:flex-1 xl:h-auto md:h-[350px] h-[350px] flex justify-center items-center '
      >
        <CatCanvas/>
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact, "contact")