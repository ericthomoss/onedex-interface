/* eslint-disable unused-imports/no-unused-imports */
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, Currency, Percent } from '@sushiswap/core-sdk'
import Gas from 'app/components/Gas'
import NavLink from 'app/components/NavLink'
import Settings from 'app/components/Settings'
import { currencyId } from 'app/functions/currency'
import { useActiveWeb3React } from 'app/services/web3'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'

// @ts-ignore TYPE NEEDS FIXING
const getQuery = (input, output) => {
  if (!input && !output) return

  if (input && !output) {
    return { inputCurrency: input.address || 'ETH' }
  } else if (input && output) {
    return { inputCurrency: input.address, outputCurrency: output.address }
  }
}

interface ExchangeHeaderProps {
  input?: Currency
  output?: Currency
  allowedSlippage?: Percent
}

const ExchangeHeader: FC<ExchangeHeaderProps> = ({ input, output, allowedSlippage }) => {
  const { i18n } = useLingui()
  const { chainId } = useActiveWeb3React()
  const router = useRouter()
  const [animateWallet, setAnimateWallet] = useState(false)
  const isRemove = router.asPath.startsWith('/remove')
  const isLimitOrder = router.asPath.startsWith('/limit-order')

  return (
    <div className="flex items-center justify-between mb-4 space-x-3">
      <div className="flex rounded bg-dark-800 h-[46px]">
        <NavLink
          activeClassName="font-bold border rounded text-high-emphesis border-dark-800 bg-gradient-to-r from-opaque-blue to-opaque-pink hover:from-blue hover:to-pink"
          href={`/${!isRemove ? 'add' : 'remove'}${input ? `/${currencyId(input)}` : ''}${
            output ? `/${currencyId(output)}` : ''
          }`}
        >
          <a className="flex items-center justify-center px-4 text-base font-medium text-center rounded-md text-secondary hover:text-high-emphesis">
            {i18n._(t`Liquidity`)}
          </a>
        </NavLink>
      </div>
      <div className="flex items-center">
        <div className="grid grid-flow-col gap-1">
          <div className="relative flex items-center w-full h-full rounded hover:bg-dark-800">
            <Settings placeholderSlippage={allowedSlippage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExchangeHeader
