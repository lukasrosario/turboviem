import type { Address, Hex, WalletRpcSchema as viem_WalletRpcSchema } from 'viem'
import type { CallWithBigIntAsHex, TransactionStatusWithBigIntAsHex } from './transaction.js'

export type WalletRpcSchema = [...viem_WalletRpcSchema, {
  Method: 'wallet_getCapabilities'
  Parameters: []
  ReturnType: Record<Hex, Record<string, any>>
}, {
  Method: 'wallet_sendTransaction'
  Parameters: [
    { chainId: Hex; sender: Address; gas?: Hex; calls: CallWithBigIntAsHex[]; capabilities?: Record<string, any> },
  ]
  ReturnType: string
}, {
  Method: 'wallet_getTransactionStatus'
  Parameters: [transactionId: string]
  ReturnType: { result: TransactionStatusWithBigIntAsHex }
}]
