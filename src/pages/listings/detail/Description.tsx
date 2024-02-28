import React from 'react'

type RenderDescriptionProps = {
  description: string
}

function RenderDescription({ description }: RenderDescriptionProps) {
  return (
    <div>
      {description?.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  )
}

export default RenderDescription
