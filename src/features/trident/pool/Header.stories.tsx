import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ChainId, WETH9 } from '@sushiswap/core-sdk'
import { useLingui } from '@lingui/react'
import { PoolType } from '../types'
import { tryParseAmount } from '../../../functions'
import { SUSHI } from '../../../config/tokens'
import { Header } from './Header'

export default {
  title: 'SushiSwap/PoolLandingHeader',
  component: Header,
  parameters: {
    zeplinLink: [
      {
        name: 'Farm',
        link: 'zpl://components?coids=611ff995a7a01a14699d936c&pid=611a9a71ba055432b5f4d870',
      },
      {
        name: 'Pool',
        link: 'zpl://components?pid=611a9a71ba055432b5f4d870&coids=611ff995e80314559426ffdb',
      },
    ],
  },
} as ComponentMeta<typeof Header>

const Template: ComponentStory<typeof Header> = (args) => {
  const { i18n } = useLingui()
  return <Header {...args} i18n={i18n} />
}

export const Pool = Template.bind({})
Pool.args = {
  pool: {
    type: PoolType.ConstantProduct,
    amounts: [tryParseAmount('1000', SUSHI[ChainId.MAINNET]), tryParseAmount('3.66', WETH9[ChainId.MAINNET])],
    tokens: [SUSHI[ChainId.MAINNET], WETH9[ChainId.MAINNET]],
    apy: '37.8',
    tvl: '$1,534,443.08',
    fee: '0.3%',
    isFarm: false,
  },
}

export const Farm = Template.bind({})
Farm.args = {
  pool: {
    type: PoolType.ConstantProduct,
    amounts: [tryParseAmount('1000', SUSHI[ChainId.MAINNET]), tryParseAmount('3.66', WETH9[ChainId.MAINNET])],
    tokens: [SUSHI[ChainId.MAINNET], WETH9[ChainId.MAINNET]],
    apy: '37.8',
    tvl: '$1,534,443.08',
    fee: '0.3%',
    isFarm: true,
  },
}