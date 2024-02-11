import { useMemo } from 'react'
import {
  Link as RouterLink,
  LinkProps,
  useResolvedPath,
  useMatch,
} from 'react-router-dom'
import { Interpolation, Theme } from '@emotion/react'


type VariantType = 'button' | 'link'

export interface LinkInterface extends LinkProps {
  variantType?: VariantType
  isFloating?: boolean
  matchDepth?: number
  styles?: Interpolation<Theme>
}

export default function Link({
                               isFloating,
                               to,
                               variantType = 'link',

                               matchDepth = 0,
                               styles,
                               ...props
                             }: LinkInterface) {
  const resolved = useResolvedPath(to)

  const depthPath = useMemo(() => {
    const pathname = resolved.pathname
    const split = pathname.split('/')
    const slice = split.slice(0, matchDepth ? matchDepth + 1 : split.length)
    const join = slice.join('/')

    return join
  }, [matchDepth, resolved.pathname])

  const match = useMatch({ path: depthPath, end: false })

  return (
    <RouterLink
      data-active={!!match}
      data-floating={isFloating}
      to={to}
      {...props}
    />
  )
}