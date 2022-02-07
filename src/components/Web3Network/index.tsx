import { ChainId } from '@sushiswap/core-sdk'
import { NETWORK_ICON } from 'app/config/networks'
import NetworkModel, { SUPPORTED_NETWORKS, switchNetwork } from 'app/modals/NetworkModal'
import { useActiveWeb3React } from 'app/services/web3'
//import { useNetworkModalToggle } from 'app/state/application/hooks'
import Image from 'next/image'
import React, { useEffect } from 'react'

function Web3Network(): JSX.Element | null {
  const { library, account, chainId } = useActiveWeb3React()

  //const toggleNetworkModal = useNetworkModalToggle()

  if (!chainId) return null

  useEffect(() => {
    const switchNetwork = async (key: ChainId) => {
      const params = SUPPORTED_NETWORKS[key]

      try {
        await library?.send('wallet_switchEthereumChain', [{ chainId: `0x${key.toString(16)}` }, account])
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        // @ts-ignore TYPE NEEDS FIXING
        if (switchError.code === 4902) {
          try {
            await library?.send('wallet_addEthereumChain', [params, account])
          } catch (addError) {
            // handle "add" error
            console.error(`Add chain error ${addError}`)
          }
        }
        console.error(`Switch chain error ${switchError}`)
        // handle other "switch" errors
      }
    }
    if (chainId != ChainId.HARMONY && chainId != ChainId.HARMONY_TESTNET) {
      switchNetwork(ChainId.HARMONY)
    }
  }, [library, account, chainId])

  return (
    <div
      className="flex items-center rounded border-2 border-dark-800 hover:border-dark-700 bg-dark-1000 hover:bg-dark-900 whitespace-nowrap text-sm font-bold cursor-pointer select-none pointer-events-auto"
      /*onClick={() => toggleNetworkModal()}*/
    >
      <div className="grid items-center grid-flow-col items-center justify-center bg-dark-1000 h-[36px] w-[36px] text-sm rounded pointer-events-auto auto-cols-max text-secondary">
        {/*@ts-ignore TYPE NEEDS FIXING*/}
        <Image src={NETWORK_ICON[chainId]} alt="Switch Network" className="rounded-md" width="22px" height="22px" />
      </div>
      <NetworkModel />
    </div>
  )
}

export default Web3Network
