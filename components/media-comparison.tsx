import React from 'react'

export type MediaComparisonProps = {
  mediaA: React.ReactNode
  mediaB: React.ReactNode
  labelA: string
  labelB: string
}

export const MediaComparison = ({ mediaA, mediaB, labelA, labelB }: MediaComparisonProps) => {
  return (
    <div className='text-center text-xs italic font-serif text-secondary rounded-md pt-4 px-4 pb-2 flex gap-4 bg-tertiary border-[0.5px] border-tertiary'>
      <div className='flex flex-col gap-3 [&>*]:rounded'>
        {mediaA}
        <span>{labelA}</span>
      </div>

      <div className='flex flex-col gap-3 [&>*]:rounded'>
        {mediaB}
        <span>{labelB}</span>
      </div>
    </div>
  )
}



