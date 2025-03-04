import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import photo from './image/photo.png';

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center text-white px-6" style={{ backgroundImage: 'url(https://source.unsplash.com/1600x900/?banking,finance)' }}>
      <motion.h1
        className="text-7xl font-extrabold mb-8 text-center drop-shadow-2xl text-black"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Mariamman Indian Bank: Your Trusted Partner
      </motion.h1>
      <motion.p
        className="text-xl mb-10 text-center max-w-3xl leading-relaxed text-black"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        Secure your future with innovative banking solutions designed to empower you. Join us for a smarter, faster, and safer banking experience.
      </motion.p>
      <motion.img
        src={photo}
        alt="Banking Illustration"
        className="w-25 h-25 object-cover rounded-2xl shadow-2xl self-end"
        style={{ marginLeft: '35%',marginTop:'30px'}}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 1 }}
      /><br></br>
      <motion.button
        className="px-6 py-3 bg-blue-500 text-black font-bold rounded-2xl shadow-lg hover:bg-blue-600"
        style={{ marginLeft: '45%',marginTop:'30px'}}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/register')}
      >
        Register
      </motion.button>
    </div>

  );
}
