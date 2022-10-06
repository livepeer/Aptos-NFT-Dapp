import Head from 'next/head';
import { Player, useAsset, useUpdateAsset, useCreateAsset, useAssetMetrics } from '@livepeer/react';
import { useState, useCallback, useMemo, useContext } from 'react';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';
import { AptosContext } from './_app';
import { Types } from 'aptos';
// import {StudioAsset} from 'livepeer/providers/studio/'
import BarLoader from 'react-spinners/BarLoader';
import styles from '../styles/Home.module.css';

import { CreateAptosTokenBody, CreateAptosTokenResponse } from '../pages/api/create-aptos-token';
import { LivepeerProvider } from '@livepeer/react';

declare global {
  interface Window {
    aptos: any;
  }
}
export default function Aptos() {
  const [address, setAddress] = useState<string | null>(null);
  const [video, setVideo] = useState<File | null>(null);
  const [isCreatingNft, setIsCreatingNft] = useState(false);
  const [creationHash, setCreationHash] = useState('');

  const router = useRouter();

  const aptosClient = useContext( AptosContext );

  const isAptosDefined = useMemo(
    () => (typeof window !== 'undefined' ? Boolean(window?.aptos) : false),
    []
  );

  

  const {
    mutate: createAsset,
    data: createdAsset,
    status: createStatus,
    uploadProgress,
  } = useCreateAsset();

  

  const { data: asset, status: assetStatus } = useAsset<LivepeerProvider, any>({
    assetId: createdAsset?.id,
    refetchInterval: (asset) => (asset?.storage?.status?.phase !== 'ready' ? 5000 : false),
  } );
  
  const { mutate: updateAsset, status: updateStatus } = useUpdateAsset();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0]);
    }
  }, []);


  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'video/*': ['*.mp4'],
    },
    maxFiles: 1,
    onDrop,
  });

  const isLoading = useMemo(
    () =>
      createStatus === 'loading' ||
      assetStatus === 'loading' ||
      (asset && asset?.status?.phase !== 'ready'),
    [createStatus, asset, assetStatus]
  );

  const progressFormatted = useMemo(
    () =>
      uploadProgress
        ? `Uploading: ${Math.round(uploadProgress * 100)}%`
        : asset?.status?.progress
        ? `Processing: ${Math.round(asset?.status?.progress * 100)}%`
        : null,
    [uploadProgress, asset?.status?.progress]
  );

  const connectWallet = useCallback(async () => {
    try {
      if (isAptosDefined) {
        await window.aptos.connect();
        const account: { address: string } = await window.aptos.account();

        setAddress(account.address);
      }
    } catch (e) {
      console.error(e);
    }
  }, [isAptosDefined]);

  const mintNft = useCallback(async () => {
    setIsCreatingNft(true);
    try {
      if (address && aptosClient && asset?.storage?.ipfs?.nftMetadata?.url) {
        const body: CreateAptosTokenBody = {
          receiver: address,
          metadataUri: asset.storage.ipfs.nftMetadata.url,
        };

        const response = await fetch('/api/create-aptos-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const json = (await response.json()) as CreateAptosTokenResponse;

        if ((json as CreateAptosTokenResponse).tokenName) {
          const createResponse = json as CreateAptosTokenResponse;

          const transaction = {
            type: 'entry_function_payload',
            function: '0x3::token_transfers::claim_script',
            arguments: [
              createResponse.creator,
              createResponse.creator,
              createResponse.collectionName,
              createResponse.tokenName,
              createResponse.tokenPropertyVersion,
            ],
            type_arguments: [],
          };

          const aptosResponse: Types.PendingTransaction =
            await window.aptos.signAndSubmitTransaction(transaction);

          const result = await aptosClient.waitForTransactionWithResult(aptosResponse.hash, {
            checkSuccess: true,
          });

          setCreationHash(result.hash);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreatingNft(false);
    }
  }, [address,aptosClient, asset?.storage?.ipfs?.nftMetadata?.url, setIsCreatingNft]);

  return (
    <div>
      <div className={styles.container}>
        <Head>
          <title>Aptos NFT Minting Sample Dapp</title>
          <meta name='description' content='Generated by create next app' />
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <span>Aptos</span>
          </h1>

          <p className={styles.description}>
            This sample application can be used to understand the video NFT minting capabilities
            provided by LivepeerJS
            <p className={styles.link}>
              <a href='https://github.com/livepeer/Aptos-NFT-Dapp'>Github</a>
            </p>
          </p>

          <div className={styles.connect}>
            <button
              className={styles.buttonConnect}
              disabled={!isAptosDefined || Boolean(address)}
              onClick={connectWallet}
            >
              {!address ? 'Connect Wallet' : address}
            </button>
          </div>

          {/* Preview Asset */}
          {/* {asset?.playbackId && (
            <div>
            <p>Preview</p>
            <Player playbackId={asset?.playbackId} autoPlay={false} muted aspectRatio='1to1' />
            </div>
          )} */}

          <>
            {address && (
              <div>
                {/* Drag/Drop file */}
                <div className={styles.drop} {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div>
                    <p>
                      Drag and drop or <span>browse files</span>
                    </p>
                  </div>
                </div>

                {/* Upload progress */}
                <div className={styles.progress}>
                  {video ? <p>Name: {video.name}</p> : <p>Select a video file to upload.</p>}
                  {progressFormatted && <p>{progressFormatted}</p>}
                </div>

                {/* Upload video */ }

                <div>
                  <button
                    className={styles.buttonConnect}
                    onClick={() => {
                      if (video) {
                        createAsset({ name: video.name, file: video });
                      }
                    }}
                    disabled={!video || isLoading || Boolean(asset)}
                  >
                    Upload Asset
                    <br />
                    {isLoading && <BarLoader color='#fff' />}
                  </button>

                  {/* Upload to IPFS/Mint */}
                  {asset?.status?.phase === 'ready' && asset?.storage?.status?.phase !== 'ready' ? (


                    <button
                      className={styles.buttonConnect}
                      onClick={() => {
                        updateAsset({
                          assetId: asset.id,
                          storage: { ipfs: true },
                        });
                      }}
                      disabled={!asset?.id || Boolean(asset?.storage?.ipfs?.cid)}
                    >
                      Upload to IPFS
                    </button>
                  ) : creationHash ? (
                    <p className={styles.link}>
                      <a href={`https://explorer.aptoslabs.com/txn/${creationHash}?network=Devnet`}>
                        View Mint Transaction
                      </a>
                    </p>
                  ) : asset?.storage?.status?.phase === 'ready' ? (
                    <button className={styles.buttonConnect} onClick={mintNft}>
                      Mint NFT
                    </button>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            )}
          </>
        </main>
      </div>
    </div>
  );
}
