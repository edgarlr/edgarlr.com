import { ButtonList, ButtonTrigger } from '@components/ui/button'
import { FigmaURL, GithubURL, TwitterURL, LinkedinURL } from '@lib/constants'
import { ElementType } from 'react'
import s from './SocialLinks.module.css'

const SocialLinks = () => {
  const getButtonTriggerProps = (href: string) => ({
    as: 'a' as ElementType<any>,
    target: '_blank',
    rel: 'noreferrer noopener',
    id: href,
    href,
    className: s.button,
    withIcon: true,
  })

  return (
    <div className={s.root}>
      <ButtonList>
        <ButtonTrigger {...getButtonTriggerProps(TwitterURL)}>
          Twitter
        </ButtonTrigger>
        <ButtonTrigger {...getButtonTriggerProps(GithubURL)}>
          Github
        </ButtonTrigger>
        <ButtonTrigger {...getButtonTriggerProps(FigmaURL)}>
          Figma
        </ButtonTrigger>
        <ButtonTrigger {...getButtonTriggerProps(LinkedinURL)}>
          LinkedIn
        </ButtonTrigger>
      </ButtonList>
    </div>
  )
}

export default SocialLinks
