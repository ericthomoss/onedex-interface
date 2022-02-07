import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { DiscordIcon, InstagramIcon, MediumIcon, TwitterIcon } from 'app/components/Icon'
import Typography from 'app/components/Typography'
import { Feature } from 'app/enums'
import { featureEnabled } from 'app/functions'
import { useActiveWeb3React } from 'app/services/web3'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import Container from '../Container'

const Footer = () => {
  const { chainId } = useActiveWeb3React()
  const { i18n } = useLingui()

  return (
    <div className="z-10 w-full mt-20">
      <Container maxWidth="full" className="mx-auto bg-neutral-700">
        <div className="flex gap-10 px-6 justify-between">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-start gap-2">
              <div className="">
                <Image src="https://app.sushi.com/images/logo.svg" alt="Sushi logo" width="28px" height="28px" />
              </div>
              <Typography
                variant="xs"
                weight={700}
                className="tracking-[0.02em] ml-4 scale-y-90 hover:text-high-emphesis"
              >
                @ Copyright ONEchain. All rights reserved.
              </Typography>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-1 text-right">
              <Link
                href={featureEnabled(Feature.TRIDENT, chainId || 1) ? '/terms/pools' : '/legacy/pools'}
                passHref={true}
              >
                <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
                  {i18n._(t`Terms & Conditions`)}
                </Typography>
              </Link>
            </div>
            <div className="flex flex-col gap-1 md:text-right lg:text-right">
              <Link
                href={featureEnabled(Feature.TRIDENT, chainId || 1) ? '/terms/pools' : '/legacy/pools'}
                passHref={true}
              >
                <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
                  {i18n._(t`Privacy policy`)}
                </Typography>
              </Link>
            </div>
            <div className="flex flex-col gap-1 text-right xs:text-right md:text-left lg:text-right">
              <Link
                href={featureEnabled(Feature.TRIDENT, chainId || 1) ? '/terms/pools' : '/legacy/pools'}
                passHref={true}
              >
                <Typography variant="xs" weight={700} className="mt-2.5 hover:text-high-emphesis">
                  {i18n._(t`Cookie use`)}
                </Typography>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Footer
