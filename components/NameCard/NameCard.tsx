import Image from 'next/image';
import { cn } from '@/app/utils';
import { hoverLiftStyle } from '@/app/styles';
import { GitHub, LinkedIn, Mail } from '@mui/icons-material';

export default function NameCard() {
  return (
    <section className={'flex flex-col max-sm:items-center'}>
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
        <div
          className={
            'w-22 aspect-auto border-2 border-accent-yellow rounded-xl p-1 flex items-center'
          }
        >
          <Image
            src={'/images/profile_img.png'}
            width={88}
            height={88}
            alt={'profile_img'}
          />
        </div>
        {/** Metadata Container */}
        <div className={'flex flex-col'}>
          <h2 className={'text-h2'}>Stephen Ko</h2>
          <span className={'text-secondary'}>
            Frontend Software Engineer, based in Singapore&nbsp;
            <span className={'not-italic'}>🇸🇬</span>
          </span>
          {/** NameCard Icons Conatiner */}
          <div
            className={
              'flex items-center lg:mt-1 gap-1 max-sm:gap-0.5 text-3xl max-sm:text-xl'
            }
          >
            <NamecardIcon
              href={'https://www.linkedin.com/in/gi-hun-ko-863619184/'}
            >
              <LinkedIn fontSize={'inherit'} />
            </NamecardIcon>
            <NamecardIcon href={'mailto:rhrlgns96@gmail.com'}>
              <Mail fontSize={'inherit'} />
            </NamecardIcon>
            <NamecardIcon href={'https://github.com/nordic96'}>
              <GitHub fontSize={'inherit'} />
            </NamecardIcon>
          </div>
        </div>
      </div>
    </section>
  );
}

function NamecardIcon({
  children,
  ...props
}: React.PropsWithChildren<Pick<React.ComponentProps<'a'>, 'href'>>) {
  const { href } = props;
  return (
    <a href={href} target={'_blank'} className={cn(hoverLiftStyle)}>
      {children}
    </a>
  );
}
