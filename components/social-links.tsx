
import { ButtonList, ButtonTrigger } from '@components/ui/button'
import { FigmaURL, GithubURL, TwitterURL, LinkedinURL } from '@lib/constants'
import { ElementType } from 'react'

export const SocialLinks = () => {
  const getButtonTriggerProps = (href: string) => ({
    as: 'a' as ElementType<any>,
    target: '_blank',
    rel: 'noreferrer noopener',
    id: href,
    href,
    withIcon: true,
  })

  return (
    <div className="flex -mx-2 gap-4">
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

