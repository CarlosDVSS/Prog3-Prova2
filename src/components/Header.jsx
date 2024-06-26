import Link from 'next/link';
import MenuItem from './MenuItem';
import { AiFillHome } from 'react-icons/ai';
import { BsFillInfoCircleFill } from 'react-icons/bs';


export default function Header() {
  return (
    <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
      <div className='flex gap-4'>
        <MenuItem title='home' address='/' Icon={AiFillHome} />
        <MenuItem title='about' address='/about' Icon={BsFillInfoCircleFill} />
      </div>
      <div className='flex items-center gap-4'>
        
        <Link href={'/'} className='flex gap-1 items-center'>
          <span className='text-2xl text-white font-bold bg-roxo py-1 px-2 rounded-lg'>
            AboutMovie
          </span>
          <span className='text-xl text-white hidden sm:inline'>JS</span>
        </Link>
      </div>
    </div>
  );
}
