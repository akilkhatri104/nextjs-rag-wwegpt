'use client'
import Image from 'next/image'
import wwe_logo from '../assests/wwe_logo.svg'

const Logo = () => {
    return (
        <div className='logoDiv'>
            <Image src={wwe_logo} alt={'wwe logo'} className='logoImage'  />
            <h1 className='logoText'>GPT</h1>
        </div>
    )
}

export default Logo