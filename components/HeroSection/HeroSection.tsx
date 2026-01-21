import { LinkedIn } from '@mui/icons-material';
import Image from 'next/image';
import { siGithub, siMedium } from 'simple-icons';

export default function HeroSection() {
  return (
    <section className={'flex flex-col'}>
      {/** Signature Container */}
      <div>
        <Image
          src={'/images/signature.svg'}
          width={289}
          height={96}
          alt={'signature'}
        />
      </div>
      <div className={'flex gap-3'}>
        {/** Profile Image Container */}
        <div className={'border-2 border-accent-yellow rounded-xl p-1'}>
          <Image
            src={'/images/profile_img.png'}
            width={88}
            height={96}
            className={'lg:w-22'}
            alt={'profile_img'}
          />
        </div>
        {/** Metadata Container */}
        <div className={'flex flex-col'}>
          <h2 className={'text-h2'}>Stephen Ko</h2>
          <span className={'text-secondary'}>
            Frontend Software Engineer, based in Singapore
          </span>
          {/** NameCard Icons Conatiner */}
          <div className={'flex items-center mt-1 gap-1 text-3xl'}>
            <LinkedIn fontSize={'inherit'} />
            <div
              className={'w-6 h-6 fill-white'}
              dangerouslySetInnerHTML={{ __html: siGithub.svg }}
            />
            <div
              className={'w-6 h-6 fill-white'}
              dangerouslySetInnerHTML={{ __html: siMedium.svg }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
