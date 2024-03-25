import { type Account, type Chain, type Client, type Hex, hexToNumber, type Transport } from 'viem'
import type { WalletRpcSchema } from '../../types/wallet.js'

export const getCapabilities = async <
  transport extends Transport = Transport,
  chain extends Chain | undefined = Chain | undefined,
  account extends Account | undefined = Account | undefined,
>(
  client: Client<transport, chain, account, WalletRpcSchema>,
): Promise<Record<number, Record<string, any>>> => {
  const capabilities = await client.request({
    method: 'wallet_getCapabilities',
    params: [],
  })

  return Object.entries(capabilities).reduce(
    (acc, [chainIdHex, capabilitiesForChain]) => ({ ...acc, [hexToNumber(chainIdHex as Hex)]: capabilitiesForChain }),
    {},
  )
}
