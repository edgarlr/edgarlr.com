import ArrowLeft from '@components/icons/ArrowLeft'
import Link from 'next/link'
import cn from 'clsx'

type Props = {
  title: string
  showBackButton?: boolean
}

export const Header = ({ title, showBackButton = false }: Props) => (
  <header
    data-visible={false}
    data-header
    className="group z-50 py-3 [--progressive-blur-height:16px] fixed inset-x-0 top-0 flex items-center after:absolute after:bg-[--border-primary] after:opacity-0 after:duration-300 data-[visible=true]:after:opacity-100 after:inset-x-0 after:bottom-0 after:h-[0.5px] before:z-[-1]  before:absolute before:inset-x-0 before:top-0 before:-bottom-[--progressive-blur-height] before:pointer-events-none  before:backdrop-blur-[10px] before:bg-[linear-gradient(to_bottom,var(--background-header),var(--background-header)_calc(100%-var(--progressive-blur-height)),transparent_calc(100%-var(--progressive-blur-height)))] before:[mask-image:linear-gradient(to_bottom,black_calc(100%-var(--progressive-blur-height)),transparent)]"
  >
    <div className={cn("w-full h-5 max-lg:px-6 flex gap-[22px] md:gap-9 flex-nowrap items-center max-w-[70ch] mx-auto", {
      "-translate-x-1 md:-translate-x-[35px]": showBackButton
    })}>
      {showBackButton && (
        <Link
          href="/"
          className="group/back w-5 h-5 relative  after:absolute after:inset-y-0 after:-right-[9.5px] md:after:-right-[15.5px] after:w-[0.5px] after:bg-[--border-primary] flex items-center justify-center text-primary transition-opacity opacity-60 hover:opacity-100 focus-visible:opacity-100"
          aria-label="Go to home"
        >
          <ArrowLeft
            width={16}
            height={16}
            className="transition-transform group-hover/back:-translate-x-1.5"
          />
        </Link>
      )}

      <span className=" leading-none pt-1 md:pt-0.5 transition-[opacity,transform] ease-out duration-300 font-serif italic opacity-0 text-ellipsis whitespace-nowrap overflow-clip translate-y-2 group-data-[visible=true]:opacity-100 group-data-[visible=true]:translate-y-0">
        {title}
      </span>
    </div>
  </header>
)
