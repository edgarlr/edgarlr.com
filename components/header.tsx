import ArrowLeft from '@components/icons/ArrowLeft'
import Link from 'next/link'

type Props = {
  title: string
  showBackButton?: boolean
}

export const Header = ({ title, showBackButton = false }: Props) => (
  <header
    data-visible={false}
    data-header
    className="group z-50 pt-3.5 pb-3 [--progressive-blur-height:16px] fixed inset-x-0 top-0 flex items-center after:absolute after:bg-[--border-primary] after:opacity-0 after:duration-300 data-[visible=true]:after:opacity-100 after:inset-x-0 after:bottom-0 after:h-[0.5px] before:z-[-1] before:absolute before:inset-x-0 before:top-0 before:-bottom-[--progressive-blur-height] before:pointer-events-none before:backdrop-blur-[10px] before:bg-[linear-gradient(to_bottom,var(--background-header)_calc(100%-var(--progressive-blur-height)),transparent_calc(100%-var(--progressive-blur-height)))] before:[mask-image:linear-gradient(to_bottom,black_calc(100%-var(--progressive-blur-height)),transparent)]"
  >
    <div className="w-full max-lg:px-4 flex flex-nowrap items-center max-w-[70ch] mx-auto">
      {showBackButton && (
        <div className="pr-4 h-5 border-r-[0.5px] mr-4 lg:-ml-[34px]">
          <Link
            href="/"
            className="group/back inline-block  text-secondary transition-colors hover:text-primary focus-visible:text-primary"
            aria-label="Go to home"
          >
            <ArrowLeft
              width={16}
              height={16}
              className="transition-transform group-hover/back:-translate-x-1.5"
            />
          </Link>
        </div>
      )}

      <span className=" leading-none transition-[opacity,transform] ease-out duration-300 font-serif opacity-0 text-ellipsis whitespace-nowrap overflow-clip translate-y-2 group-data-[visible=true]:opacity-100 group-data-[visible=true]:translate-y-0">
        {title}
      </span>
    </div>
  </header>
)
