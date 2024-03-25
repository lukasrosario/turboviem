import { type Chain, type Client, hexToBigInt, type Transport } from 'viem'
import type { Account } from 'viem/accounts'
import type { TransactionStatus } from '../../types/transaction.js'
import type { WalletRpcSchema } from '../../types/wallet.js'

export type GetTransactionStatusParameters = {
  transactionId: string
}

export const getTransactionStatus = async <
  transport extends Transport = Transport,
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
>(
  client: Client<transport, chain, account, WalletRpcSchema>,
  args: GetTransactionStatusParameters,
): Promise<TransactionStatus> => {
  const { transactionId } = args

  const transactionStatus = (await client.request({
    method: 'wallet_getTransactionStatus',
    params: [transactionId],
  })).result

  return {
    ...transactionStatus,
    receipt: {
      ...transactionStatus.receipt,
      blockNumber: hexToBigInt(transactionStatus.receipt.blockNumber),
      gasUsed: hexToBigInt(transactionStatus.receipt.gasUsed),
    },
  }
}
