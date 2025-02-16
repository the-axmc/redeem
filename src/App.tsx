import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { type BaseError, useWaitForTransactionReceipt, useWriteContract } from 'wagmi'
import { abi } from './abi'

function App() {
  const account = useAccount()
  const { connectors, connect, status, error:errorConnect } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: hash, error, isPending, writeContract } = useWriteContract()
  const address = '0x8903412ac24281421f1D94Fe27De56c0433f3d1f'

  async function redeemBond(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const tokenId = formData.get('tokenId') as string
    writeContract({
      address: address,
      abi,
      functionName: 'redeemBond',
      args: [BigInt(tokenId)],
    })
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{errorConnect?.message}</div>
      </div>

      <div>
        <h2>Redeem</h2>
        <form onSubmit={redeemBond}>
          <input name="tokenId" type="number" defaultValue="0" required />
          <button disabled={isPending} type="submit">{isPending ? 'Confirming...' : 'Redeem'}</button>
        </form>
      </div>

      <div>
        <h2>Status</h2>
        {hash && <div>Transaction Hash: {hash}</div>}
          {isConfirming && <div>Waiting for confirmation...</div>}
          {isConfirmed && <div>Transaction confirmed.</div>}
          {error && (
            <div>Error: {(error as BaseError).message || error.message}</div>
          )}
      </div>
    </>
  )
}

export default App
