import type { Address, Hash, Hex } from 'viem'

export type Call = {
  target: Address
  value: bigint
  data: Hex
}

export type CallWithBigIntAsHex = {
  target: Address
  value: Hex
  data: Hex
}

export type TransactionStatus = {
  status: 'PENDING' | 'CONFIRMED'
  receipt: {
    logs: {
      address: Address
      data: Hex
      topics: Hex[]
    }[]
    success: boolean
    blockHash: Hash
    blockNumber: bigint
    gasUsed: bigint
    transactionHash: Hash
  }
}

export type TransactionStatusWithBigIntAsHex = {
  status: 'PENDING' | 'CONFIRMED'
  receipt: {
    logs: {
      address: Address
      data: Hex
      topics: Hex[]
    }[]
    success: boolean
    blockHash: Hash
    blockNumber: Hex
    gasUsed: Hex
    transactionHash: Hash
  }
}
