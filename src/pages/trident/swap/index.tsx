/* eslint-disable unused-imports/no-unused-imports */
import { ArrowDownIcon } from '@heroicons/react/outline'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId, TradeVersion } from '@sushiswap/core-sdk'
import Chip from 'app/components/Chip'
import Container from 'app/components/Container'
import DoubleGlowShadow from 'app/components/DoubleGlowShadow'
import Gas from 'app/components/Gas'
import SettingsTab from 'app/components/Settings'
import Typography from 'app/components/Typography'
import { Feature } from 'app/enums'
import ConfirmSwapModal from 'app/features/legacy/swap/ConfirmSwapModal'
import _useSwapPage from 'app/features/trident/swap/_useSwapPage'
import { DerivedTradeContext } from 'app/features/trident/swap/DerivedTradeContext'
import RecipientPanel from 'app/features/trident/swap/RecipientPanel'
import SwapAssetPanel from 'app/features/trident/swap/SwapAssetPanel'
import SwapButton from 'app/features/trident/swap/SwapButton'
import SwapRate from 'app/features/trident/swap/SwapRate'
import {
  selectTridentSwap,
  setAttemptingTxn,
  setReceiveToWallet,
  setSpendFromWallet,
  setTridentSwapState,
  TypedField,
} from 'app/features/trident/swap/swapSlice'
import WrapButton from 'app/features/trident/swap/WrapButton'
import useCurrenciesFromURL from 'app/features/trident/useCurrenciesFromURL'
import { getTradeVersion } from 'app/functions/getTradeVersion'
import NetworkGuard from 'app/guards/Network'
import useENS from 'app/hooks/useENS'
import { useSwapCallback } from 'app/hooks/useSwapCallback'
import useSwapSlippageTolerance from 'app/hooks/useSwapSlippageTollerence'
import { useActiveWeb3React } from 'app/services/web3'
import { useAppDispatch, useAppSelector } from 'app/state/hooks'
import { useExpertModeManager } from 'app/state/user/hooks'
import { TradeUnion } from 'app/types'
import React, { useCallback, useMemo, useState } from 'react'

const Swap = () => {
  const { formattedAmounts, trade, priceImpact, isWrap, parsedAmounts, error } = _useSwapPage()
  const tradeVersion = getTradeVersion(trade)
  const { i18n } = useLingui()
  const { chainId } = useActiveWeb3React()
  const { currencies, setURLCurrency, switchCurrencies } = useCurrenciesFromURL()
  const [expertMode] = useExpertModeManager()
  const dispatch = useAppDispatch()
  const tridentSwapState = useAppSelector(selectTridentSwap)
  const {
    typedField,
    spendFromWallet,
    receiveToWallet,
    recipient,
    attemptingTxn,
    showReview,
    error: swapStateError,
  } = tridentSwapState
  const { address } = useENS(recipient)
  const [txHash, setTxHash] = useState<string>()
  const [confirmTrade, setConfirmTrade] = useState<TradeUnion>()

  const allowedSlippage = useSwapSlippageTolerance(trade)

  const handleArrowsClick = useCallback(async () => {
    dispatch(setTridentSwapState({ ...tridentSwapState, value: '', typedField: TypedField.A }))
    await switchCurrencies()
  }, [dispatch, switchCurrencies, tridentSwapState])

  const { callback, error: cbError } = useSwapCallback(trade, allowedSlippage, address ?? undefined, null, {
    receiveToWallet,
    fromWallet: spendFromWallet,
    parsedAmounts,
  })

  const execute = useCallback(async () => {
    if (!callback) return
    dispatch(setAttemptingTxn(true))

    let error
    let { value, typedField } = tridentSwapState
    try {
      const txHash = await callback()
      setTxHash(txHash)

      value = ''
      typedField = TypedField.A
    } catch (e) {
      // @ts-ignore TYPE NEEDS FIXING
      error = e.message
    }

    dispatch(setTridentSwapState({ ...tridentSwapState, value, typedField, error, attemptingTxn: false }))
  }, [callback, dispatch, tridentSwapState])

  const handleDismiss = useCallback(() => {
    dispatch(setTridentSwapState({ ...tridentSwapState, showReview: false, error: undefined }))
  }, [dispatch, tridentSwapState])

  return (
    <Container className="px-2 py-4 md:py-8 lg:py-20" maxWidth="lg">
      <DoubleGlowShadow>
        <div className="shadow rounded-[20px] bg-dark-900 pb-3">
          <div className="flex items-center justify-between py-2 pl-4 pr-2">
            <Typography weight={700}>{i18n._(t`Swap`)}</Typography>
            <div className="flex items-center justify-end gap-3">
              <div id="btn-transaction-settings" className="border border-transparent rounded">
                <SettingsTab trident={true} />
              </div>
            </div>
          </div>
          <div className="block w-full border-b lg:hidden border-dark-800" />
          <div className="flex flex-col px-2 lg:gap-3 ">
            <SwapAssetPanel
              error={typedField === TypedField.A && !!error && !!formattedAmounts[0]}
              header={(props) => <SwapAssetPanel.Header {...props} id={`asset-select-trigger-${TypedField.A}`} />}
              walletToggle={(props) => (
                <SwapAssetPanel.Switch
                  {...props}
                  disabled={tradeVersion === TradeVersion.V2TRADE}
                  label={i18n._(t`Pay from`)}
                  onChange={(spendFromWallet) => dispatch(setSpendFromWallet(spendFromWallet))}
                  id="chk-pay-from-wallet"
                />
              )}
              selected={typedField === TypedField.A}
              spendFromWallet={spendFromWallet}
              currency={currencies[0]}
              value={formattedAmounts[0]}
              onChange={(value) =>
                dispatch(setTridentSwapState({ ...tridentSwapState, value: value || '', typedField: TypedField.A }))
              }
              onSelect={(currency) => setURLCurrency(currency, 0)}
            />
            <div className="flex justify-center relative lg:mt-[-23px] lg:mb-[-23px]">
              <div
                id="btn-switch-currencies"
                className="rounded-full lg:border-2 lg:border-dark-800 hover:lg:border-dark-700 hover:text-white bg-dark-900 p-1.5 cursor-pointer"
                onClick={handleArrowsClick}
              >
                <ArrowDownIcon width={16} height={16} />
              </div>
            </div>
            <SwapAssetPanel
              error={typedField === TypedField.B && !!error && !!formattedAmounts[0]}
              header={(props) => <SwapAssetPanel.Header {...props} id={`asset-select-trigger-${TypedField.B}`} />}
              walletToggle={(props) => (
                <SwapAssetPanel.Switch
                  {...props}
                  disabled={tradeVersion === TradeVersion.V2TRADE}
                  label={i18n._(t`Receive to`)}
                  onChange={(receiveToWallet) => dispatch(setReceiveToWallet(receiveToWallet))}
                  id="chk-receive-to-wallet"
                />
              )}
              selected={typedField === TypedField.B}
              spendFromWallet={receiveToWallet}
              currency={currencies[1]}
              value={formattedAmounts[1]}
              onChange={(value) => {
                // Change typedField to TypedField.B once exactOut is available
                dispatch(setTridentSwapState({ ...tridentSwapState, value: value || '', typedField: TypedField.A }))
              }}
              onSelect={(currency) => setURLCurrency(currency, 1)}
              priceImpact={priceImpact}
              // Remove when exactOut works
              disabled={true}
            />
            <DerivedTradeContext.Provider
              value={useMemo(
                () => ({
                  formattedAmounts,
                  trade,
                  priceImpact,
                  error: error ?? swapStateError ?? cbError ?? undefined,
                  isWrap,
                  parsedAmounts,
                }),
                [cbError, error, formattedAmounts, isWrap, parsedAmounts, priceImpact, swapStateError, trade]
              )}
            >
              {expertMode && (
                <div className="mb-3 lg:mb-0">
                  <RecipientPanel />
                </div>
              )}
              {trade && (
                <div className="flex flex-col px-3 mb-3 border divide-y rounded border-dark-800 lg:mb-0 divide-dark-800">
                  <div className="flex justify-between py-2">
                    <Typography variant="sm">{i18n._(t`Version`)}</Typography>
                    <Chip
                      id="trade-type"
                      label={tradeVersion === TradeVersion.V2TRADE ? 'Legacy' : 'Trident'}
                      color={tradeVersion === TradeVersion.V2TRADE ? 'blue' : 'green'}
                    />
                  </div>
                  <div className="py-2">
                    <SwapRate className="font-bold text-primary" />
                  </div>
                </div>
              )}
              {isWrap ? <WrapButton /> : <SwapButton onClick={(trade) => setConfirmTrade(trade)} />}
            </DerivedTradeContext.Provider>
            <ConfirmSwapModal
              isOpen={showReview}
              trade={trade}
              originalTrade={confirmTrade}
              onAcceptChanges={() => setConfirmTrade(trade)}
              attemptingTxn={attemptingTxn}
              txHash={txHash}
              recipient={recipient}
              allowedSlippage={allowedSlippage}
              onConfirm={execute}
              swapErrorMessage={swapStateError}
              onDismiss={handleDismiss}
            />
          </div>
        </div>
      </DoubleGlowShadow>
    </Container>
  )
}

Swap.Guard = NetworkGuard(Feature.TRIDENT)

export default Swap
