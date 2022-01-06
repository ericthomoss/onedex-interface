import Container, { MaxWidth } from 'app/components/Container'
import Header from 'app/components/Header'
import Main from 'app/components/Main'
import Popups from 'app/components/Popups'
import { BreadcrumbItem } from 'app/features/trident/Breadcrumb'
import { classNames } from 'app/functions'
import React, { FC } from 'react'

const HEADER_HEIGHT = 64

type HeaderBackground =
  | 'bg-bars-pattern'
  | 'bg-binary-pattern'
  | 'bg-bubble-pattern'
  | 'bg-dots-pattern'
  | 'bg-x-times-y-is-k'
  | 'bg-wavy-pattern'
  | 'bg-chevron-pattern'

interface TridentHeaderProps {
  className?: string
  pattern?: HeaderBackground
  maxWidth?: MaxWidth
  condensed?: boolean
}

export const TridentHeader: FC<TridentHeaderProps> = ({
  children,
  className,
  pattern,
  maxWidth = '7xl',
  condensed,
}) => {
  return (
    <header className={classNames('relative w-full bg-opacity-80 flex flex-col items-center')}>
      <Container
        maxWidth={maxWidth}
        className={classNames('flex flex-col gap-5 z-[1] p-5 lg:p-10', condensed && 'py-5', className)}
      >
        {children}
      </Container>
    </header>
  )
}

interface TridentBodyProps {
  className?: string
  maxWidth?: MaxWidth
}

export const TridentBody: FC<TridentBodyProps> = ({ children, className, maxWidth = '7xl' }) => {
  return (
    <Main>
      <Container maxWidth={maxWidth} className={classNames('flex flex-col gap-10 p-5 lg:p-10 z-[1]', className)}>
        {children}
      </Container>
    </Main>
  )
}

interface TridentLayoutProps {
  breadcrumbs?: BreadcrumbItem[]
}

const TridentLayout: FC<TridentLayoutProps> = ({ children = [], breadcrumbs = [] }) => {
  return (
    <>
      <Header height={HEADER_HEIGHT} />
      {/*<Breadcrumb breadcrumbs={breadcrumbs} />*/}
      <Container maxWidth="7xl" className="mx-auto">
        <div className="flex flex-col items-center w-full h-screen">
          <div className="bg-dark-1000 w-full flex-grow flex flex-col">{children}</div>
          <Popups />
        </div>
      </Container>
    </>
  )
}

export default TridentLayout